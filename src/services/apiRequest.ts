
'use client'
import { profileStart, profileSuccess, profileFailed, logOutSuccess, logOutStart, loginFailed, loginStart, loginSuccess, } from "../redux/features/auth/authSlice";
import { loginError, loginDone } from "../redux/features/error/errSlice";
import { totalProduct,
    addProductStart,
    addProductSuccess,
    addProductFailed,
    loadProductStart,
    loadProductSuccess,
    loadProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    updateProductStart,
    updateProductSuccess,
    updateProductFailed, 
    loadProductDetailStart,
    loadProductDetailSuccess,
    loadProductDetailFailed,
    loadPageProductSuccess,
    } from "../redux/features/product/productSlice";

import { loadCategoryStart,loadCategorySuccess,loadCategoryFailed } from "@/redux/features/dashboard/dashboardSlice";
import { totalResume,loadResumeStart,loadResumeSuccess,loadResumeFailed,loadPageResumeSuccess} from "../redux/features/resume/resumeSlice";
import { getUserStart, getUserSuccess,getUserFailed,totalUser, loadPageUserSuccess } from "../redux/features/user/userSlice";
import api from "./api";
import url from "./url";
import { Dispatch } from "@reduxjs/toolkit";
import { AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosInstance } from "axios";
import { NewCapsule,NewLiquid,NewTablet,UpdateCapsule } from "@/components/types/typeProduct";


//Auth
export const handleLogin = (async (data: User, dispatch: Dispatch, navigate: AppRouterInstance) => {
    dispatch(loginStart())
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data];
    if (value !== undefined) {       
        formData.append(key, value.toString());
    }
    });
    try {
        const rs = await api.post(`${url.BASE_URL}${url.USER.LOGIN}`, formData, {
            headers: { 'Content-Type': 'application/json'},
        });
        const auth = {
            accessToken: rs.data.accessToken,
            refreshToken: rs.data.refreshToken,
            id: rs.data.id
        };
        const tokenStr = rs.data.accessToken;
        const refreshToken = rs.data.accessToken;
        
        if(rs.data.role === 'Admin'){
            dispatch(loginSuccess(auth));
            dispatch(loginDone());
            navigate.push("../home")
        }
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStr}`;
        api.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
        if (!(rs.status === 200)) {
            throw new Error(`HTTP error! status: ${rs.status}`);
        } else if (rs.status === 200 && rs.data.status === 404 || rs.data.status === 401) {
            throw new Error('Failed');
        }
    } catch (error: any) {
        dispatch(loginFailed())
        if(error === 'Failed')
        dispatch(loginError())
    }
})

export const logOut = async (dispatch: Dispatch, navigate: AppRouterInstance,id: number, tokenStr:string, axiosJWT: AxiosInstance) => {
    dispatch(logOutStart());
    const data = {"id": id};
    try{
        const rs = await axiosJWT.post(`${url.BASE_URL}${url.USER.LOGOUT}`,data,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        
        dispatch(logOutSuccess()); 
        navigate.push('/login')
    }catch(error:any){  
        localStorage.removeItem('persist:reduxStorage');
        navigate.push('/login')
        dispatch(logOutSuccess());  
    };
}

export const profileRequest = async (dispatch: Dispatch, tokenStr: string, axiosJWT: AxiosInstance) => {
    dispatch(profileStart());
    try{
        const rs = await axiosJWT.get(`${url.BASE_URL}${url.USER.PROFILE}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(profileSuccess(rs.data));
    } catch(error){
        dispatch(profileFailed());
    }
}

//Product
export const addCapsule = async (data: NewCapsule, dispatch: Dispatch, tokenStr: string) => {
    dispatch(addProductStart())
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    try {
        const rs = await api.post(`${url.BASE_URL}${url.PRODUCT.ADD.CAPSULE}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${tokenStr}`},
      });
    dispatch(addProductSuccess(rs.data))
    } catch (error) {
        dispatch(addProductFailed())
    }
};

export const addLiquid = async (data: NewLiquid, dispatch: Dispatch, tokenStr: string) => {
    dispatch(addProductStart())
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    try {
        const rs = await api.post(`${url.BASE_URL}${url.PRODUCT.ADD.LIQUID}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${tokenStr}`},
      });
    dispatch(addProductSuccess(rs.data))
    } catch (error) {
        dispatch(addProductFailed())
    }
};

export const addTablet = async (data: NewTablet, dispatch: Dispatch, tokenStr: string) => {
    dispatch(addProductStart())
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    try {
        const rs = await api.post(`${url.BASE_URL}${url.PRODUCT.ADD.LIQUID}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${tokenStr}`},
      });
    dispatch(addProductSuccess(rs.data))
    } catch (error) {
        dispatch(addProductFailed())
    }
};

export const deleteProduct = async (id: number, tokenStr:string, dispatch:Dispatch, navigate: AppRouterInstance) => {
    dispatch(deleteProductStart())
    try {
      const rs = await api.delete(`${url.BASE_URL}${url.PRODUCT.DELETE}${id}`,{
        headers: {Authorization: `Bearer ${tokenStr}`},
    });
    if (!(rs.status === 200)) {
        throw new Error(`HTTP error! status: ${rs.status}`);
    } else if(rs.status === 200 && rs.data.status === 204){
        navigate.push('/home/product')
    } else if (rs.status === 200 && rs.data.status === 404 ) {
        navigate.push('/home/product')
        throw new Error('Not Found');
    }
    dispatch(deleteProductSuccess(id))
    } catch (error) {
        if(error === 'Not Found'){
            dispatch(deleteProductFailed())
        }
        dispatch(deleteProductFailed())

    }
};

export const updateCapsule = async (dataProd:UpdateCapsule, tokenStr:string, dispatch: Dispatch) => {
  dispatch(updateProductStart())
  const formData = new FormData();
  for (let key in dataProd) {
      formData.append(key, dataProd[key]);
  }
  try {
      const rs = await api.post(`${url.BASE_URL}${url.PRODUCT.UPDATE.CAPSULE}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${tokenStr}`},
    });
    const data = rs.data;
    dispatch(updateProductSuccess(data)) 
  } catch (error) {
    dispatch(updateProductFailed())
  }
};

export const loadProduct = async (category:number, sort:string, page: number, dispatch:Dispatch)=>{
  dispatch(loadProductStart())
  try {
      const rs = await api.get(`${url.BASE_URL}${url.PRODUCT.LOAD.DEFAULT}${url.PRODUCT.LOAD.CATEGORY}${category}${url.PRODUCT.LOAD.SORT}${sort}${url.PRODUCT.LOAD.PAGE}${page}`);
      dispatch(loadProductSuccess(rs.data.metaData))
      dispatch(totalProduct(rs.data.totalProduct))
  } catch (error) {
      dispatch(loadProductFailed())
    }
};

export const loadPageProduct = async (category:number, sort:string, page: number, dispatch:Dispatch)=>{
    try {
        const rs = await api.get(`${url.BASE_URL}${url.PRODUCT.LOAD.DEFAULT}${url.PRODUCT.LOAD.CATEGORY}${category}${url.PRODUCT.LOAD.SORT}${sort}${url.PRODUCT.LOAD.PAGE}${page}`);
        dispatch(loadPageProductSuccess(rs.data.metaData))
    } catch (error) {
        console.log(error)
      }
};

export const loadProductDetail= async (id:number, dispatch:Dispatch)=>{
    dispatch(loadProductDetailStart())
    try {
        const rs = await api.get(`${url.BASE_URL}${url.PRODUCT.LOAD.DETAIL}${id}`);
        dispatch(loadProductDetailSuccess(rs.data))
    } catch (error) {
        dispatch(loadProductDetailFailed())
      }
  };

// Category
export const loadCategory = async (dispatch: Dispatch) => {
    dispatch(loadCategoryStart())
    try {
        const rs = await api.get(`${url.BASE_URL}${url.CATEGORY.LOAD}`);
        dispatch(loadCategorySuccess(rs.data))
    } catch (error) {
        dispatch(loadCategoryFailed())
      }
}

//Resume
export const loadResume = async (dispatch: Dispatch, status: string, filter: string, tokenStr:string, page:number) => {
    dispatch(loadResumeStart())
    try{
        const rs = await api.get(`${url.BASE_URL}${url.RESUME.LOAD.DEFAULT}${status}${url.RESUME.LOAD.FILTER}${filter}${url.RESUME.LOAD.PAGE}${page}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(loadResumeSuccess(rs.data.metaData));
        dispatch(totalResume(rs.data.totalResume));
    } catch{
        dispatch(loadResumeFailed())
    }
}

export const loadPageResume = async (dispatch: Dispatch, status: string, filter: string, tokenStr:string, page:number) => {
    try{
        const rs = await api.get(`${url.BASE_URL}${url.RESUME.LOAD.DEFAULT}${status}${url.RESUME.LOAD.FILTER}${filter}${url.RESUME.LOAD.PAGE}${page}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(loadPageResumeSuccess(rs.data.metaData));
    } catch{
    }
}




// User
export const loadUser = async (dispatch: Dispatch, tokenStr:string, page:number) => {
    dispatch(getUserStart())
    try{
        const rs = await api.get(`${url.BASE_URL}${url.USER.LOAD}${url.USER.PAGE}${page}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(getUserSuccess(rs.data.metaData))
        dispatch(totalUser(rs.data.totalUser));
    } catch{
        dispatch(getUserFailed())
    }
}
export const loadPageUser = async (dispatch: Dispatch, tokenStr:string, page:number) => {
    try{
        const rs = await api.get(`${url.BASE_URL}${url.USER.LOAD}${url.USER.PAGE}${page}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(loadPageUserSuccess(rs.data.metaData));
    } catch{
        
    }
}
export const handleStatus = async (dispatch: Dispatch, tokenStr: string, id: number, axiosJWT: AxiosInstance) =>{
    try{
        const rs = await axiosJWT.get(`${url.BASE_URL}${url.USER.ONOFF}${id}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        })
    }catch{

    }
}
