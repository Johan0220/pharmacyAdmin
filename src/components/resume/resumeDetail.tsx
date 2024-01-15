'use client'
import Image from "next/image";
import api from "@/services/api";
import url from "@/services/url";
import {FormEvent, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { ResumeHandler} from "../types/typeResume"; 
import { useAppSelector } from "@/redux/hooks";
import Loading from "../loading/loadFull";
const ResumeDetail = (props: any) => {
        const resume = props.resume;
        const [isFetching, setIsFetching] = useState(false);
        const [cancel, setCancel] = useState({})
        const token = useAppSelector((state) => state.auth.login.currentToken);
        const tokenStr = token?.accessToken
        const date = new Date();
        const [body, setBody] = useState<ResumeHandler>({
                idProfileDetail: '',
                isQualified: 1,
                body: {
                        to: '',
                        interviewAddress: '8A Ton That Thuyet, My Dinh, Nam Tu Niem, Ha Noi',
                        appointment: '',
                        content: '',
                }
        })
        const [cancelShow, setCancelShow] = useState(false)
        const [editprod, setEditprod] = useState(false);
        const navigate = useRouter();
        const resumeHandler = async ( data: any ) => {
                setIsFetching(true);
                // const formData = new FormData();
                // Object.keys(data).forEach((key) => {
                //         const value = data[key as keyof typeof data];
                //         if (value !== undefined) {       
                //                 formData.append(key, value.toString());
                //         }
                // });
                try{
                        const rs = await api.post(`${url.BASE_URL}${url.RESUME.ACCEPTORCANCEL}`, data, {
                                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenStr}`},
                            });
                        setIsFetching(false)
                        if(rs.data.status === 201){
                                navigate.push('/home/resume')
                        }
                } catch(error){
                        setIsFetching(false)
                        console.log(error)
                }
        }
        const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
                const { name, value } = event.target;
                setBody(prevState => ({
                    ...prevState,
                    idProfileDetail: resume.id,
                    body: {
                        ...prevState.body,
                        [name]: value,
                        to: resume.email
                    }
                }));
        };
        const handleCancel = (id: string, code:number) => {
                setCancel({                
                    idProfileDetail: id,
                    isQualified: code,
                });
        };
        const handleSubmit = (event:FormEvent) => {
                event.preventDefault();
                resumeHandler(body)
        }
        return(
                <>      

                        <div id="acceptModal" tabIndex={-1} aria-hidden="true" style={{display:editprod? "block" : "none"}} className="hidden bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div className="start-30 relative p-4 w-full max-w-2xl max-h-full">
                                        {/* <!-- Modal content --> */}
                                        <div className="relative border-solid border-2 rounded-lg p-4 bg-white shadow dark:border-slate-600 dark:bg-gray-800 sm:p-5">
                                                {/* <!-- Modal header --> */}
                                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5  dark:border-gray-600">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Send Email</h3>
                                                <button onClick={()=>{setEditprod(!editprod)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="updateProductModal">
                                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                        <span  className="sr-only">Close modal</span>
                                                </button>
                                                </div>
                                                {/* <!-- Modal body --> */}
                                                <form action="#" onSubmit={handleSubmit}>
                                                <div className="mb-4">                 
                                                        <div>
                                                                <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To: {resume.email}</label>
                                                        </div>
                                                        <div className="my-5">
                                                                <label htmlFor="interviewAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                                                <input type="text" name="interviewAddress" onChange={handleChange} value={body.body?.interviewAddress} id="interviewAddress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter interview address" required/>
                                                        </div>
                                                        <div className="my-5">
                                                                <label htmlFor="appointment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appointment</label>
                                                                <input type="date" name="appointment" onChange={handleChange} value={body.body?.appointment} id="appointment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter appointment schedule" required/>
                                                        </div>                              
                                                        
                                                        

                                                        <div className="my-5">
                                                                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                                                <textarea id="content" name="content" onChange={handleChange} value={body.body?.content} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product content here"></textarea>
                                                        </div>
                                                </div>
                                                <div className="flex items-center justify-between space-x-4">

                                                        <button onClick={()=>{setEditprod(!editprod)}} type="submit" className="py-2 px-3 text-sm font-medium flex items-center justify-center text-gray-900 focus:outline-none bg-blue-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                                                                Send
                                                        </button>
                                                        <button onClick={()=>{setEditprod(!editprod)}} data-modal-add="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                                </div>
                                                </form>
                                        </div>
                                        </div>           
                        </div>

                        <div id="cancelModal" tabIndex={-1} aria-hidden="true" style={{display:cancelShow? "block" : "none"}} className="none bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-w">
                                <div className="inset-35 relative p-4 w-full max-w-md max-h-full">
                                {/* <!-- Modal content --> */}
                                <div className="relative p-4 text-center bg-white border-solid border rounded-lg shadow dark:border-gray-600 dark:bg-gray-800 sm:p-5">
                                        <button onClick={()=>{setCancelShow(!cancelShow)}} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="cancelModal">
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                        </button>
                                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to cancel this resume?</p>
                                        <div className="flex justify-center items-center space-x-4">
                                                <button onClick={()=>{setCancelShow(!cancelShow)}} data-modal-add="cancelModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                                <button onClick={()=>{resumeHandler(cancel),setCancelShow(!cancelShow)}} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I&apos;m sure</button>
                                        </div>
                                </div>
                                </div>
                        </div>
                        {isFetching?(<Loading/>):(

                        
                        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">         
                                <div className="border-gray-200 dark:border-gray-600">
                                        {/* 1 */}
                                        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                                                <div className="flex pb-4">
                                                        {(resume.email === '')?
                                                        (
                                                        <Image className="rounded-full" src={resume.thumbnail} height="150" width="150" alt="avatar"></Image>
                                                        ):
                                                        (
                                                        <Image className="rounded-full" src="/avatar/avatar-default.jpg" height="150" width="150" alt="avatar"></Image>
                                                        )}
                                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{resume.fullname}</h5>
                                                        <h6 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Age: {resume.age}</h6>
                                                        <h6 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Sex: {resume.gender}</h6>     
                                                        
                                                        {/* <input className="bg-slate-50 border" id="cv" type="file" /> */}
                                                        </div>
                                                </div>
                                                <div className="w-w mx-auto text-gray-900 dark:text-white">     
                                                        <ul className="pr-20">  
                                                                <li className="pb-4">                          
                                                                        <div className="font-semibold dark:text-white">Date Of Birth: <span className="text-sm pl-1 text-gray-500 dark:text-gray-400">{resume.dateOfBirth}</span></div>
                                                                        
                                                                </li>
                                                                <li className="pb-4">                          
                                                                        <div className="font-semibold dark:text-white">Address: <span className="text-sm pl-1 text-gray-500 dark:text-gray-400">{resume.address}</span></div>
                                                                        
                                                                </li>
                                                                <li className="pb-4">
                                                                        <div className="font-semibold dark:text-white">Phone Number: <span className="text-sm pl-1 text-gray-500 dark:text-gray-400">{resume.number}</span></div>
                                                                        
                                                                </li>
                                                                <li className="pb-4">           
                                                                        <div className="font-semibold dark:text-white">Email: <span className="text-sm pl-1 text-gray-500 dark:text-gray-400">{resume.email}</span></div>
                                                                                        
                                                                </li>
                                                                <li className="pb-4">            
                                                                        <div className="font-semibold dark:text-white">Skill: <span className="text-sm text-gray-500 dark:text-gray-400">{resume.skills}</span></div>         
                                                                </li>
                                                                                
                                                        </ul>
                                                </div>    
                                                <div className="mt-8 border-t-1">       
                                                        <ul className="pt-4">
                                                                <li className="pb-4">                          
                                                                        <div className="font-semibold dark:text-white">University: <span className="text-sm text-gray-500 dark:text-gray-400">{resume.universityOrCollege}</span></div>
                                                                        
                                                                </li>

                                                                <li className="pb-4">
                                                                
                                                                        <div className="font-semibold dark:text-white">Date time: <span className="text-sm text-gray-500 dark:text-gray-400">{resume.issuedDate} - {resume.expiryDate}</span></div>
                                                                </li>
                                                                <li className="pb-4">            
                                                                        <div className="font-semibold dark:text-white">Scientific Achievements: <span className="text-sm text-gray-500 dark:text-gray-400">{resume.scientificAchievements}</span></div>
                                                                        
                                                                </li>
                                                                <li className="pb-4">                       
                                                                        <div className="font-semibold dark:text-white">Work Experiences: <span className="text-sm text-gray-500 dark:text-gray-400">{resume.workExperiences}</span></div>
                                                                                                
                                                                </li>
                                                                <li>                     
                                                                        <div className="font-semibold dark:text-white">Reference: <span className="text-sm text-gray-500 dark:text-gray-400">{resume.reference}</span></div>
                                                                        
                                                                </li>
                                                        </ul>
                                                </div>         
                                                <div className="mt-8 border-t-1">
                                                        <ul className="flex pt-4 justify-between">
                                                                <li className="pb-4">            
                                                                        <div className="font-semibold dark:text-white">Status</div>
                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">{resume.isAccepted}</span>       
                                                                </li>
                                                                <li className="pb-4">                       
                                                                        <div className="font-semibold dark:text-white">Created at</div>
                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">{resume.createdAt}</span>                          
                                                                </li>
                                                                <li>                     
                                                                        <div className="font-semibold dark:text-white">Updated at</div>
                                                                        <span className="text-sm text-gray-500 dark:text-gray-400">{resume.updateAt}</span>
                                                                </li>
                                                        </ul>
                                                </div>
                                                <div className="mt-8 flex justify-between">
                                                        <button type="button" onClick={()=>{setEditprod(!editprod)}} className="flex w-32 items-center py-2 px-4 text-gray-900 focus:outline-none bg-green-400 rounded-lg border border-gray-200 hover:bg-green-500 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-green-500 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-400">
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                                                                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                        </svg>
                                                                        Accept
                                                        </button>
                                                        <button type="button" onClick={()=>{handleCancel(resume.id,2),setCancelShow(!cancelShow)}} className="flex w-32 items-center py-2 px-4 hover:bg-red-700 text-gray-200 dark:hover:text-white bg-red-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:focus:ring-red-900">
                                                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 384 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                                <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                                        </svg>
                                                                        Not Pass
                                                        </button>
                                                </div>
                                        </div>  
                                </div>
                        </div>
                        )}
                </>
        )
}
export default ResumeDetail;
