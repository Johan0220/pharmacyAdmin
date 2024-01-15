'use client'
import api from "@/services/api";
import url from "@/services/url";
import React, {useState,useEffect} from "react";
import ResumePending from "@/components/resume/resumePending";
import ResumeHandled from "@/components/resume/resumeHandled";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadResume, loadPageResume} from "@/services/apiRequest";
import Loading from "@/components/loading/loadFull";
import OutsideClickHandler from "react-outside-click-handler";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoadingMore from "@/components/loading/loadMore";
import EndMessage from "@/components/loading/endMessage";
const Resume = () => {

    const resumes: any = useAppSelector((state)=>state.resume.resumes.list);
    const totalResume = useAppSelector((state)=>state.resume.resumes.totalResume);
    const token: any = useAppSelector((state)=>state.auth.login.currentToken);
    const error: any = useAppSelector((state)=>state.resume.resumes.error);
    const isFetching :any = useAppSelector((state)=>state.resume.resumes.isFetching);
    const tokenStr: string = token?.accessToken;
    const dispatch = useAppDispatch();
    // useEffect(() => {
        //     if(!user)
        //     navigate.push('/login')
        //   }, []);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [name, setName] = useState<string>("") 
    const [resSearch, setResSearch] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('submitted?')
    const [filter, setFilter] = useState("")
    const [componentShow, setComponentShow] = useState<number>(1);
    const [items, setItems] = useState(resumes);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setName(value);
    };
    const fetchMoreData = () => {
        let pageNumber:number = page + 1;
        setTimeout(() => {
            loadPageResume(dispatch,status,filter, tokenStr,pageNumber)
        },2000)
    };
    const handleShowComponent = (component:number) => {
        setComponentShow(component);
    }
    
    const handleStatusChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let value = event.target.value;
        setFilter(value)
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (name === '' || name === undefined) {
                return;
            }
            try {
                const rs= await api.get(`${url.BASE_URL}${url.RESUME.SEARCH}${name}&${url.RESUME.LOAD.PAGE}${1}`);
                setResSearch(rs.data);
            } catch (error) {
                console.log(error);
            }
        },100)
        return () => clearTimeout(delayDebounceFn)
    }, [name]);

    useEffect(()=>{
        setItems(resumes)     
    },[resumes]);
    useEffect(()=>{
        loadResume(dispatch,status,filter, tokenStr,page)
    },[status,filter]);
    return(
        <>
            <div className="sm:ml-64"> {/* pt-14 */}
                {/* <!-- Start block --> */}
                    <div className="fixed w-w mx-auto">
                        {/* <!-- Start coding here --> */}
                        <div className="h-screen bg-white dark:bg-gray-800 relative shadow-m overflow-hidden">
                            {isFetching?<Loading/>:null}
                                <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 space-y-3 md:space-y-0 md:space-x-4 p-4">
                                    <div className="w-full md:w-1/2">
                                        <form className="flex items-center relative">
                                            <label htmlFor="simple-search" className="sr-only">Search</label>
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                <input onClick={() => setDropdownVisible(true)} onChange={handleSearch} value={name} type="text" id="simple-search" className=" w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required/>
                                            </div>
                                        </form>
                                        <OutsideClickHandler onOutsideClick={() => {setDropdownVisible(false)}}>                                      
                                            <div id="dropdownSearch" className="z-100 absolute mt-4 min-w-max bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 dark:divide-gray-600">                                                
                                                 { (dropdownVisible && name) ? (
                                                        resSearch.length > 0 ? (
                                                            <ul>
                                                                {resSearch.map((resume:any, index:number) => (
                                                                <li key={index}>
                                                                <Link href={`/home/resume/${resume.id}`}>
                                                                    <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{resume.number}</span>
                                                                    </div> 
                                                                </Link>
                                                                
                                                            </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <div className="flex p-2 rounded">
                                                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cannot found resume</span>
                                                            </div> 
                                                        )
                                                    ) : null}
                                                    
                                            </div>
                                        </OutsideClickHandler>
                                    </div>                       
                                    {componentShow === 2?
                                    (<div className="w-full md:w-auto flex flex-col  md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                        <select onChange={handleStatusChange} id="filterColor" name="fillColor" className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                                            <option value="">All</option>
                                            <option value="QUALIFIED&">Qualified</option>
                                            <option value="UNQUALIFIED&">UnQualified</option>
                                        </select>
                                    </div>
                                    ) : null}
                                </div>
                                <div>
                                <div className="items-center space-x-3 w-full md:w-auto pb-1">
                                        <ul className="flex justify-between"> 
                                                <li className="w-3/6">
                                                    <button onClick={()=>{handleShowComponent(1),setStatus("submitted?")}} id="component1" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:bg-gray-600">
                                                      Pending
                                                    </button>
                                                </li>
                                                <li className="w-3/6">
                                                    <button onClick={()=>{handleShowComponent(2),setStatus("history?")}} id="component2" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:bg-gray-600">
                                                      History
                                                    </button>
                                                </li>          
                                        </ul>                                                          
                                    </div>
                                    <div id="parentScroll" className="h-85vh overflow-auto">
                                        {!error?(                               
                                                
                                            <InfiniteScroll 
                                            dataLength={items?.length || 0}
                                            next={fetchMoreData}
                                            hasMore={items?.length < totalResume}
                                            loader={<LoadingMore/>}
                                            endMessage={<EndMessage/>}
                                            scrollableTarget="parentScroll"
                                            >
                                                <table className="table-auto w-full left-1/4 text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-azure-smoke dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-4 py-4">NO</th>
                                                            <th scope="col" className="px-4 py-4">ID</th>
                                                            <th scope="col" className="px-4 py-4">Full Name</th>
                                                            <th scope="col" className="px-4 py-3">Email</th>
                                                            <th scope="col" className="px-4 py-3">Number</th>
                                                            <th scope="col" className="px-4 py-3">University</th>
                                                            <th scope="col" className="px-4 py-3">Status</th>
                                                            <th scope="col" className="px-4 py-3 text-center">Actions</th> 
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                        {resumes?.map((r:any,index:number) => {
                                                            return(
                                                            <tr key={index} className="border-b relative dark:border-gray-700">
                                                                {componentShow === 1 && <ResumePending resumes={r} tokenStr={tokenStr} index={index} page={page}/>}
                                                                {componentShow === 2 && <ResumeHandled resumes={r} tokenStr={tokenStr} index={index} page={page}/>}
                                                            </tr>)                                     
                                                        })}
                                                    </tbody>                             
                                                </table>
                                            </InfiniteScroll>):
                                        (<div className="flex w-w h-w absolute flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                            <span className="text-xl text-gray-500 dark:text-gray-400">Not Found!</span>
                                        </div>)} 
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
        
        </>
    )
    
}
export default Resume;