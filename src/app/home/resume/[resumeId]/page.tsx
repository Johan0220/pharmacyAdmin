'use client'
import LoadingImage from "@/components/loading/loadImg";
import LoadingLine from "@/components/loading/loadLine";
import {default as ResumeGird} from "@/components/resume/resumeDetail";
import { ResumeDetail } from "@/components/types/typeResume";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import api from "@/services/api";
import url from "@/services/url";
import { loadResume } from "@/services/apiRequest";
const ReDetail = ({ params }: { params: { resumeId: string } }) => {
    const token: any = useAppSelector((state)=>state.auth.login.currentToken);
    const tokenStr: string = token?.accessToken;
    const [isFetching, setIsFetching] = useState(false)
    const [resume, setResume] = useState<ResumeDetail>({
        id: '',
        fullname: '',
        age: 0,
        dateOfBirth: '',
        gender: '',
        address: '',
        number: '',
        email: '',
        thumbnail: '',
        fileCv: '',
        skills: '',
        universityOrCollege: '',
        major: '',
        issuedDate: '',
        expiryDate: '',
        scientificAchievements: '',
        workExperiences: '',
        reference: '',
        status: '',
        createdAt: '',
        updateAt: '',
        isAccepted: '',
    })
    let id =  params.resumeId;
    const loadDetail = async () => {
            setIsFetching(true)
            try{
                const rs = await api.get(`${url.BASE_URL}${url.RESUME.DETAIL}${id}`,{
                    headers: {Authorization : `Bearer ${tokenStr}`}
                });
                setResume(rs.data)
                setIsFetching(false)
            } catch{
                setIsFetching(false)
            }
        }  
    useEffect(()=>{
        loadDetail()
    },[])
    return(
        <>
            <div className="sm:ml-64">
                <div className="fixed w-w mx-auto">
                        {/* <!-- Start coding here --> */}
                     <div className="h-screen bg-white dark:bg-gray-800 relative shadow-m overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-700 space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <h1 className="font-bold text-2xl dark:text-white">Resume detail {id}</h1>
                            </div>
                        </div>
                        {/* Loading */}
                        <div className="overflow-auto h-95vh">
                            <div className="justify-center mr-40 mb-8 mt-8 ml-40">
                                <ResumeGird resume={resume}/>
                            </div>
                        </div>     
                    </div>       
                </div>       
            </div>       
        </>
    ) 
}
export default ReDetail;