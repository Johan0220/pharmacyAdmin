'use client'
import LoadingImage from "@/components/loading/loadImg";
import LoadingLine from "@/components/loading/loadLine";
import Capsule from "@/components/product/productCapsule";
import Liquid from "@/components/product/productLiquid";
import Tablet from "@/components/product/productTablet";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadProductDetail } from "@/services/apiRequest";
import { useEffect } from "react";
const ProductDetail = ({ params }: { params: { productId: number } }) => {
   
    let id =  params.productId;
    const dispatch = useAppDispatch()
    const productDetail = useAppSelector((state)=>state.product.products.productDetail)
    const isFetching = useAppSelector((state)=>state.product.products.isFetching)
    useEffect(()=>{
        loadProductDetail(id,dispatch);     
    },[]);
    useEffect(()=>{
        loadCategory();
    },[]);
    const loadCategory = () => {
        
    }
    return(
        <>
            <div className="sm:ml-64">
                <div className="fixed w-w mx-auto">
    
                    {/* <!-- Start coding here --> */}
                    <div className="h-screen bg-white dark:bg-gray-800 relative shadow-m overflow-hidden">
                        
                    <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-700 space-y-3 md:space-y-0 md:space-x-4 p-4">
                                    
                                    <div className="w-full md:w-1/2">
                                        <h1 className="font-bold text-2xl text-white">Product detail {id}</h1>
                                    </div>
                                    
                                </div>
                                {/* Loading */}
                                <div>
                                    {isFetching?
                                    (
                                        <div className="grid justify-between w-w px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                                            <div className="grid justify-between w-w px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                                                <ul className="pr-5">
                                                    <LoadingLine/>
                                                    <LoadingLine/>                                                      
                                                </ul>
                                                
                                                <ul>
                                                    <LoadingLine/>
                                                    <LoadingLine/>                                                     
                                                </ul>
                                            </div>
                                            <div >
                                                <div className="mt-24 w-2/3 ml-32 h-2/4">
                                                    <LoadingImage/>
                                                </div>         
                                            </div>
                                        </div>
                                        ):(
                                            <>
                                                {productDetail?.cateId === 1 && <Capsule product={productDetail}/>}
                                                {productDetail?.cateId === 2 && <Liquid product={productDetail}/>}
                                                {productDetail?.cateId === 3 && <Tablet product={productDetail}/>}
                                            </>
                                        )
                                    }
                                </div> 
                                
                    </div>
                    
                </div>       
            </div>       
        </>
    ) 
}
export default ProductDetail;