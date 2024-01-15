import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Dispatch } from "@reduxjs/toolkit";
import url from "./url";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
const refreshToken = async (data:any, navigate:AppRouterInstance) => {
   try {
      const rs = await axios.post(`${url.BASE_URL}${url.USER.REFRESHTOKEN}`,data,{        
         headers: {'Content-Type':'application/json'}, 
      });
      return rs.data; 
   } catch(error){
      navigate.push('/login')
   }
  }

 const createAxios = ( currentToken:any, dispatch: Dispatch,navigate: AppRouterInstance, stateSuccess: any) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) =>{
          let date = Date.now() / 1000;
          const decoded = jwtDecode<JwtPayload>(currentToken?.accessToken);
          if (decoded?.exp && decoded.exp < date){
            const data = await refreshToken({
               id: currentToken?.id,
               refreshToken: currentToken?.refreshToken
            },navigate);
            const refreshUser = {
              ...currentToken,
              accessToken : data.accessToken,
              refreshToken: data.refreshToken
            };
            dispatch(stateSuccess(refreshUser));
            config.headers["token"] = "Bearer" + data.accessToken
          }
          return config;
        },
        (error) => {return Promise.reject(error)}
      )
      return newInstance;
}
export default createAxios;
