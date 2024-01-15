import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import api from "@/services/api";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import url from "@/services/url";
import OutsideClickHandler from "react-outside-click-handler";

import createAxios from "@/services/createAxios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { handleStatus } from "@/services/apiRequest";
const  UsersList = (props:any) => { 
    const users = props.users;
    const index = props.index;
    const page = props.page;
    const dispatch = useAppDispatch();
    const token: any = useAppSelector((state) => state.auth.login.currentToken);
    const navigate = useRouter();
    let axiosJWT = createAxios(token,dispatch,navigate,loginSuccess);
    const tokenStr: string = token?.accessToken;
    const [actprod,setActprod] = useState(false)
    const [delprod,setDelprod] = useState(false)
    const handleAction = (id:number) => {
        handleStatus(dispatch, tokenStr, id, axiosJWT)
    }
    return (
        <>
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{(page - 1) * 10 + index + 1}</th>
                
                <td className="px-4 py-3 items-center">
                    {/* {users?(
                        <Image className="rounded-xl"  src={users?.thumbnail} width="50" height="50" alt={users?.usersName}/>
                    ):(
                        <Image className="rounded-xl"  src="/avatar/avatar-default.jpg" width="40" height="40" alt="user photo"/>
                    )} */}
                    <Image className="rounded-xl"  src="/avatar/avatar-default.jpg" width="40" height="40" alt="user photo"/>

                </td>
                <td className="px-4 py-3">{users.id}</td>
                <td className="px-4 py-3">{users.username}</td>
                <td className="px-4 py-3">{users.email}</td>
                <td className="px-4 py-3">{users.role}</td>
                <td className="px-4 py-3">{users.isActive?(<>Active</>):(<>Locked</>)}</td>                     
                <td className="px-4 py-3 flex justify-center ">
                    <OutsideClickHandler onOutsideClick={(actprod)=>{setActprod(!actprod)}}>
                    <button onClick={()=>{setActprod(!actprod)}} id={users.id} data-dropdown-add={users.name} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>
                    <div id={users.name} style={{display:actprod?"block":"none"}} className="none right-2 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm" aria-labelledby={users.name}>
                            <li>
                                <button onClick={()=>{handleAction(users.id)}} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                {users.isActive?(<>
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                                    </svg>
                                    <span>Lock</span>
                                </>):(<>
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 576 512">
                                        <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/>
                                    </svg>
                                    <span>UnLock</span>
                                </>)}    
                                

                                
                                </button>
                            </li>
                            
                        </ul>
                    </div>
                </OutsideClickHandler>
            </td>
            {/* <!-- Comfirm Delete --> */}
            <div id="deleteModal" tabIndex={-1} aria-hidden="true" style={{display:delprod? "block" : "none"}} className="none bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-w">
                <div className="inset-35 relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 text-center bg-white border-solid border rounded-lg shadow dark:border-gray-600 dark:bg-gray-800 sm:p-5">
                        <button onClick={()=>{setDelprod(!delprod)}} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="deleteModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={()=>{setDelprod(!delprod)}} data-modal-add="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            <button onClick={()=>{setDelprod(!delprod)}} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I&apos;m sure</button>
                        </div>
                    </div>
                </div>
            </div>

         
            
        </>
    )
}
export default UsersList