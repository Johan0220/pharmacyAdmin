import Image from "next/image";
import { useState, useEffect } from "react";
import { deleteProduct, updateCapsule } from "@/services/apiRequest";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { UpdateCapsule } from "../types/typeProduct";
import createAxios from "@/services/createAxios";
import { loginSuccess } from "@/redux/features/auth/authSlice";
const Capsule = (props:any) => { 
      const product = props.product
      const token: any = useAppSelector((state)=>state.auth.login.currentToken);
      const navigate = useRouter()
      const dispatch = useAppDispatch();
      let file;
      if (typeof window !== 'undefined') {
            file = new File(['fileBits'], 'fileName', { type: 'text/plain' });
      }
      let axiosJWT = createAxios(token,dispatch,navigate,loginSuccess)
      const [delprod,setDelprod] = useState(false)
      const [editMode, setEditMode] = useState(false);
      const [preview, setPreview] = useState('');
      const [updateProduct, setUpdateProduct] = useState<UpdateCapsule>(
            {
            id: product.id, 
            productName: product.productName,
            title: product.title,
            thumbnail: file,
            output: product.capsuleP?.output,
            capsuleSize: product.capsuleP?.capsuleSize,
            machineDimension: product.capsuleP?.machineDimension,
            shippingWeight: product.capsuleP?.shippingWeight,  
            }
      )
      const handleDelete = () => {
            deleteProduct(product.id,token?.accessToken,dispatch, navigate, axiosJWT)
      }
      const handleChangeUpdate = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
            let value: number | string | File  = event.target.value;
            if ((event.target as HTMLInputElement).type === 'file'){
                // Xử lý cho trường hợp input là file
                const files = (event.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                    value = files[0];
                }
            }
            setUpdateProduct(updateProduct => ({
                ...updateProduct,
                [event.target.name]: value
            
            }));
      };
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if(!event.target.files) return;
            let file = event.target.files[0];
            if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                  if (reader.result === null) return;
                  setPreview(reader.result.toString());
            };
            reader.readAsDataURL(file);
            }
          };
      const handleUpdate = () => {
            updateCapsule(updateProduct,token?.accessToken,dispatch, axiosJWT)
      }
      return(
            <>       
            
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
                                          <button onClick={()=>{handleDelete(),setDelprod(!delprod)}} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I&apos;m sure</button>
                                    </div>
                        </div>
                        </div>
                  </div>
                  {/* Form Update */}
                  {editMode?(
                        <>
                              <form className="grid justify-between w-w px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6" action="">
                                    <div className="grid overflow-auto h-612 justify-between w-w px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                                          <ul className="pr-5">
                                                <li className="pb-5">
                                                      <label htmlFor="productName" className="font-semibold">Product Name:</label>
                                                      <input type="text" name="productName" onChange={handleChangeUpdate}  value={updateProduct.productName} id="productName" className="bg-gray-50 text-sm text-gray-500 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Product Name" required/>
                                                </li>
                                                <li className="pb-5">
                                                      <div className="font-semibold">Category:</div>
                                                      <span className="text-sm text-gray-500 dark:text-gray-400">{product.cateGet?.cateName}</span>                  
                                                </li>
                                                <li className="pb-5">
                                                      <label htmlFor="title" className="font-semibold">Title:</label>
                                                      <input type="text" name="title" onChange={handleChangeUpdate} value={updateProduct.title} id="title" className="bg-gray-50 text-sm text-gray-500 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Title" required/>
                                                </li>
                                                <li className="pb-5">
                                                      <label htmlFor="output" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Output:</label>
                                                      <textarea id="output" name="output" onChange={handleChangeUpdate} value={updateProduct.output} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter output here"></textarea>

                                                </li>
                                                <li className="pb-5">
                                                      <label htmlFor="capsuleSize" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Capsule Size:</label>
                                                      <textarea id="capsuleSize" name="capsuleSize" onChange={handleChangeUpdate} value={updateProduct.capsuleSize} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Capsule Size here"></textarea>                                                </li>
                                                <li className="pb-5">
                                                      <label htmlFor="machineDimension" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Machine Dimension:</label>
                                                      <textarea id="machineDimension" name="machineDimension" onChange={handleChangeUpdate} value={updateProduct.machineDimension} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Machine Dimension here"></textarea>
                                                </li>
                                                
                                          </ul>
                                          <ul>
                                                <li>
                                    
                                                      <label htmlFor="shippingWeight" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Shipping Weight:</label>
                                                      <textarea id="shippingWeight" name="shippingWeight" onChange={handleChangeUpdate} value={updateProduct.shippingWeight} rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Shipping Weight here"></textarea>
                                                </li>
                                          </ul>
                                          </div>
                                          <div className="flex flex-col justify-center items-center">                                                                  
                                                {preview?(
                                                      <Image className="my-16" src={preview} height="300" width="200" alt="image"></Image>
                                                ):(
                                                      <Image className="my-16" src={product.thumbnail} height="300" width="200" alt="image"></Image>
                                                )
                                                } 
                                                <input onChange={(event)=>{handleFileChange(event);handleChangeUpdate(event)}} className="block auto text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file"/>
                                          </div>
                                          
                              </form>  
                        </>
                  ):(
                        <>
                              <div className="grid justify-between w-w px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">                                 
                                    <div className="overflow-auto h-612 grid justify-between w-w px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                                                <ul className="pr-5">
                                                      <li className="pb-5">                          
                                                            <div className="font-semibold">Product Name:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.productName}</span>  
                                                      </li>
                                                      <li className="pb-5">
                                                            <div className="font-semibold">Category:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.cateGet?.cateName}</span>                  
                                                      </li>
                                                      <li className="pb-5">
                                                            <div className="font-semibold">Title:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.title}</span>                                     
                                                      </li>
                                                      
                                                      <li className="pb-5">            
                                                            <div className="font-semibold">Output:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.capsuleP?.output}</span>       
                                                      </li>
                                                      <li className="pb-5">                       
                                                            <div className="font-semibold">Capsule Size:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.capsuleP?.capsuleSize}</span>                          
                                                      </li>
                                                      <li className="pb-5">                     
                                                            <div className="font-semibold">Machine Dimension:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.capsuleP?.machineDimension}</span>
                                                      </li>
                                                </ul>                  
                                                <ul>
                                                      <li className="pb-5">                     
                                                            <div className="font-semibold">Shipping Weight:</div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.capsuleP?.shippingWeight}</span>
                                                      </li>
                                                </ul>
                                    </div>
                                    <div className="grid justify-items-center items-center">
                                          <Image src={product.thumbnail} height="300" width="200" alt="Anh"  ></Image>
                                    </div>
                              </div>
                        </>
                  )}
                  

                  
                  <div className="flex w-full md:w-auto fixed right-0 bottom-5 mr-8 md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  {editMode?(
                        <>
                              <button onClick={()=>{handleUpdate(),setEditMode(false)}} type="button" className="flex w-32 items-center py-2 px-4 text-gray-900 focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-400 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-green-500 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-400">
                                          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                          </svg>
                                          Save
                              </button>
                              <button onClick={()=>{setEditMode(false)}} type="button" className="flex w-32 items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-red-400 text-white dark:hover:text-white bg-red-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:focus:ring-red-900">
                                          <svg className="w-4 h-4 mr-2" viewBox="0 0 384 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                          </svg>
                                          Cancel
                              </button> 
                        </>
                  ):(
                        <>
                              <button onClick={()=>{setEditMode(true),setPreview('')}} type="button" className="flex w-32 items-center py-2 px-4 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500">
                                          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                          </svg>
                                          Edit
                              </button>  


                              <button onClick={()=>{setDelprod(!delprod)}} type="button" data-modal-target="deleteModal" data-modal-add="deleteModal" className="flex w-32 items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-red-400 text-white dark:hover:text-white bg-red-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:focus:ring-red-900">
                                          <svg className="w-4 h-4 mr-2" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                          </svg>
                                          Delete
                              </button>  
                        </>
                  )}
                        

                                                      
                  </div>
                  
            </>
      )
}
export default Capsule;



