'use client'
import { useState, useEffect } from "react"
import createAxios from "@/services/createAxios";
import url from "@/services/url";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { StatisticData } from "@/components/types/typeStatistical";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { loadCategory } from "@/services/apiRequest";
import Loading from "@/components/loading/loadFull";
import dynamic from "next/dynamic";
const DayCV = dynamic(() => import("@/components/home/dayCV"), { ssr: false });
const WeekCV = dynamic(() => import("@/components/home/weekCv"), { ssr: false });
const MonthCV = dynamic(() => import("@/components/home/monthCV"), { ssr: false });
const ProductStatistic = dynamic(() => import("@/components/home/productStatistic"), { ssr: false });
const HomePage = () => {
  const [isFetching,setIsFetching] = useState(false)
  const token:any= useAppSelector((state) => state.auth.login.currentToken);
  const categories: any = useAppSelector((state)=>state.dashboard.loadCategory.category);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  let axiosJWT = createAxios(token,dispatch,navigate,loginSuccess)
  const [data, setData] = useState<StatisticData>()
  const [cateName,setCateName] = useState({})
  const loadStatistical = async (tokenStr:string) => {
      setIsFetching(true)
      try{
          const rs = await axiosJWT.get(`${url.BASE_URL}${url.STATISTICAL}`,{
              headers: {Authorization: `Bearer ${tokenStr}`}
          })
          setData(rs.data)
          setIsFetching(false)  
      } catch(error){
          setIsFetching(false)
      }
  }
  useEffect(() => {
    categories?.map((c:any, index:number) => {
      setCateName(prevState => ({
        ...prevState,
        ['cateName' + (index+1)]: c.cateName
      }));
    });
    
  },[categories]);
  useEffect(()=>{
      loadStatistical(token?.accessToken);
      loadCategory(dispatch);
  },[])
  
  return(
      <>
        <div className="sm:ml-64"> {/* pt-14 */}
          {/* <!-- Start block --> */}
          <div className="fixed w-w mx-auto">
            {/* <!-- Start coding here --> */}
            <div className="h-screen bg-white dark:bg-gray-800 relative shadow-m overflow-hidden">
              <div className="flex flex-col md:flex-row h-14 items-center justify-center bg-white dark:bg-gray-800 dark:text-gray-200 space-y-3 md:space-y-0 md:space-x-4 p-4">                   
                <div className="w-full md:w-auto fixed flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">     
                  
                  <h1 className="text-2xl font-semibold">Statistic</h1>
                </div>
              </div>
              <div className="overflow-auto h-95vh bg-slate-200">
                {/* 1 */}
                <div className="mt-8 px-8">
                  <ProductStatistic data={data} cateName={cateName}/>
                </div>
                {/* end */}
                <div className="grid grid-cols-3 gap-8 my-8 px-8">
                  {/* chart1 */}
                  <DayCV data={data}/>
                  {/* chart2 */}
                  <WeekCV data={data}/>
                  {/* chart3 */}
                  <MonthCV data={data}/>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </>
  )
}
export default HomePage