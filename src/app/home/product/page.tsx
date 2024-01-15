'use client'
import React, { FormEvent, useState,useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductLiquid from "@/components/product/productListLiquid";
import ProductCapsule from "@/components/product/productListCapsule";
import ProductTablet from "@/components/product/productListTablet";
import { NewCapsule, ProductSearch, NewLiquid, NewTablet } from "@/components/types/typeProduct";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/navigation";
import { addCapsule,addLiquid,addTablet,loadProduct,loadCategory, loadPageProduct} from "@/services/apiRequest";
import Loading from "@/components/loading/loadFull";
import OutsideClickHandler from "react-outside-click-handler";
import { useAppSelector } from "@/redux/hooks";
import api from "@/services/api";
import url from "@/services/url";
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";
import LoadingMore from "@/components/loading/loadMore";
import EndMessage from "@/components/loading/endMessage";
const Product = () => {
    let file;
    if (typeof window !== 'undefined') {
        file = new File(['fileBits'], 'fileName', { type: 'text/plain' });
    }
    const products: any = useAppSelector((state)=>state.product.products.list);
    const totalProduct = useAppSelector((state)=>state.product.total.totalProduct);
    const token: any = useAppSelector((state)=>state.auth.login.currentToken);
    const categories: any = useAppSelector((state)=>state.dashboard.loadCategory.category);
    const error: any = useAppSelector((state)=>state.product.products.error);
    const isFetching :any = useAppSelector((state)=>state.product.products.isFetching);
    const tokenStr: string = token?.accessToken;
    const dispatch = useDispatch();
    // useEffect(() => {
        //     if(!user)
        //     navigate.push('/login')
        //   }, []);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownAdd, setDropdownAdd] = useState(false);
    const [addProduct,setAddProduct] = useState(false)   
    const [formShow, setFormShow] = useState<number>(0);
    const [name, setName] = useState<string>("") 
    const [proSearch, setProSearch] = useState<ProductSearch[]>([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState(1)
    const [sort, setSort] = useState("")
    const [componentShow, setComponentShow] = useState<number>(1);
    const [cateForm, setCateForm] = useState("")
    const [items, setItems] = useState(products);
    const [hasMore, setHasMore] = useState(true);
    const [newCapsule, setNewCapsule] = useState<NewCapsule>({  
        cateId: 1,
        productName: '',
        title: '',
        thumbnail: file,
        output: '',
        capsuleSize: '',
        machineDimension: '',
        shippingWeight: ''
    });

    const [newLiquid, setLNewLiquid] = useState<NewLiquid>({  
        cateId: 1,
        productName: '',
        title: '',
        thumbnail: file,
        airPressure: '',
        airVolume: '',
        fillingSpeed: '',
        fillingRange: ''
    });

    const [newTablet, setNewTablet] = useState<NewTablet>({  
        cateId: 0,
        productName: '',
        title: '',
        thumbnail: file,
        modelNumber: '',
        dies: '',
        maxPressure: '',
        maxDiameterOfTablet: '',
        maxDepthOfFill: '',
        productionCapacity: '',
        machineSize: '',
        netWeight: ''
    });



    const handleChangeCapsule = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let value: string | File  = event.target.value;
        if ((event.target as HTMLInputElement).type === 'file'){
            // Xử lý cho trường hợp input là file
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                value = files[0];
            }
        }
        setNewCapsule(newCapsule => ({
            ...newCapsule,
            [event.target.name]: value
            
        }));   
    };
    const handleChangeLiquid = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let value: string | File  = event.target.value;
        if ((event.target as HTMLInputElement).type === 'file'){
            // Xử lý cho trường hợp input là file
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                value = files[0];
            }
        }
        setLNewLiquid(newLiquid => ({
            ...newLiquid,
            [event.target.name]: value
            
        }));   
    };
    const handleChangeTablet = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let value: string | File  = event.target.value;
        if ((event.target as HTMLInputElement).type === 'file'){
            // Xử lý cho trường hợp input là file
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                value = files[0];
            }
        }
        setNewTablet(newTablet => ({
            ...newTablet,
            [event.target.name]: value
            
        }));   
    };

    const handleShowForm = (cateID:number) =>{
        setFormShow(cateID)
    }

    const handleShowComponent = (cateID:number) => {
        setComponentShow(cateID);
    }

    const handleSortChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let value = event.target.value;
        setSort(value)
    }


    const handleAddCapule = (event:FormEvent) => {
        event.preventDefault();
        addCapsule(newCapsule, dispatch, tokenStr)
    }
    const handleAddLiquid = (event:FormEvent) => {
        event.preventDefault();
        addLiquid(newLiquid, dispatch, tokenStr)
    }
    const handleAddTablet = (event:FormEvent) => {
        event.preventDefault();
        addTablet(newTablet, dispatch, tokenStr)
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setName(value);
    };
    const fetchMoreData = () => {
        let pageNumber:number = page + 1;
        setTimeout(() => {
            loadPageProduct(category,sort,pageNumber,dispatch) 
        },2000)
    };
    
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (name === '' || name === undefined) {
                return;
            }
            try {
                const rs= await api.get(`${url.BASE_URL}${url.PRODUCT.LOAD.DEFAULT}${url.PRODUCT.LOAD.SEARCH}${name}`);
                setProSearch(rs.data);
            } catch (error) {
                console.log(error);
            }
        },100)
        return () => clearTimeout(delayDebounceFn)
    }, [name])
    useEffect(()=>{
        loadProduct(category,sort,page,dispatch);   
    },[category,sort]);
    useEffect(()=>{
        loadCategory(dispatch);     
    },[]);
    useEffect(()=>{
        setItems(products)     
    },[products]);
    useEffect(()=>{
        if(isFetching == true)
            setAddProduct(false);
    },[isFetching])
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
                                                        proSearch.length > 0 ? (
                                                            <ul>
                                                                {proSearch.map((product, index) => (
                                                                <li key={index}>
                                                                <Link href={`/home/product/${product.id}`}>
                                                                    <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{product.productName}</span>
                                                                    </div> 
                                                                </Link>
                                                                
                                                            </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <div className="flex p-2 rounded">
                                                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cannot find product</span>
                                                            </div> 
                                                        )
                                                    ) : null}
                                                    
                                            </div>
                                        </OutsideClickHandler>
                                    </div>                       
                                    <div className="w-full md:w-auto flex flex-col  md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                        <select onChange={handleSortChange} id="filterColor" name="fillColor" className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                                            <option value="NAME_DESC">A-Z</option>
                                            <option value="NAME_ASD">Z-A</option>
                                        </select>
                                        
                                        <OutsideClickHandler onOutsideClick={(dropdownAdd) => {setDropdownAdd(!dropdownAdd)}}>                                       
                                            <button onClick={() => setDropdownAdd(!dropdownAdd)} type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-add="createProductModal" className="w-full relative md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-50 focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500">
                                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                                </svg>
                                                <span>Add Product</span>
                                            </button>
                                            <div id="dropdownAdd" style={{display: dropdownAdd ? "block" : "none"}} className="z-50 mt-2 right-0 absolute hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-blue-600 dark:divide-gray-600">
                                                <ul className="" role="none">
                                                    {categories?.map((c:any, index:number)=>( 
                                                    <li key={index}>
                                                        <Link href="#" onClick={()=>{handleShowForm(c?.id),setAddProduct(true)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-blue-500 dark:hover:text-white" role="menuitem">{c?.cateName}</Link>
                                                    </li> 
                                                    ))}                             
                                                </ul>
                                        </div> 
                                        </OutsideClickHandler>
                                    </div>
                                </div>
                                <div>
                                <div className="items-center space-x-3 w-full md:w-auto pb-1">
                                        <ul className="flex justify-between">
                                            {categories?.map((cate: any, index: number)=>(
                                                <li key={index} className="w-2/6">
                                                    <button onClick={()=>{handleShowComponent(cate?.id),setCategory(cate?.id)}} id="filterCate1" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:bg-gray-600">
                                                      {cate?.cateName}
                                                    </button>
                                                </li>
                                            ))}                
                                        </ul>                                                          
                                    </div>
                                    
                                    <div id="parentScroll" className="h-85vh overflow-auto">
                                        <InfiniteScroll 
                                        dataLength={items?.length || 0}
                                        next={fetchMoreData}
                                        hasMore={items?.length < totalProduct}
                                        loader={<LoadingMore/>}
                                        endMessage={<EndMessage/>}
                                        scrollableTarget="parentScroll"
                                        >
                                            <table className="table-auto w-full left-1/4 text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-azure-smoke dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-4">NO</th>
                                                        <th scope="col" className="px-4 py-4">Thumbnail</th>
                                                        <th scope="col" className="px-4 py-4">ID</th>
                                                        <th scope="col" className="px-4 py-3">Name</th>
                                                        <th scope="col" className="px-4 py-3">Category</th>
                                                        <th scope="col" className="px-4 py-3">Title</th>
                                                        <th scope="col" className="px-4 py-3 text-center">Actions</th> 
                                                    </tr>
                                                </thead>
                                                {!error                                  
                                                ?
                                                <tbody>
                                                    
                                                    {products?.map((p:any,index:number) => {
                                                        return(
                                                        <tr key={index} className="border-b relative dark:border-gray-700">
                                                            {componentShow === 1 && <ProductCapsule products={p} tokenStr={tokenStr} index={index} page={page}/>}
                                                            {componentShow === 2 && <ProductLiquid products={p} tokenStr={tokenStr} index={index} page={page} />}
                                                            {componentShow === 3 && <ProductTablet products={p} tokenStr={tokenStr} index={index} page={page} />}
                                                        </tr>)                                     
                                                    })}
                                                    
                                                </tbody>
                                                :
                                                <div className="flex w-w h-w absolute flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                                    <span className="text-xl text-gray-500 dark:text-gray-400">Not Found!</span>
                                                </div>
                                            }                                  
                                            </table>
                                        </InfiniteScroll>
                                    </div>
                                   
                                </div>
                        </div>
                    </div>
                {/* <!-- End block -->*/}
                {/*<!-- Create Product--> */}
                {(formShow === 1 && addProduct == true )?(                       
                <div id="createProductCapsule" tabIndex={-1} aria-hidden="true" className="overflow-y-auto bg-smoke overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0">
                    <div className="start-30 relative p-4 w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative border-solid border-2 rounded-lg p-4 bg-white shadow dark:border-slate-600 dark:bg-gray-800 sm:p-5">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product Capsule</h3>
                                <button onClick={()=>{setAddProduct(!addProduct)}} type="button" className="ml-12 text-gray-400 bg-transparent hover:bg-slate-400 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-add="createProductModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <form onSubmit={handleAddCapule} encType="multipart/form-data"  >
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div className="hidden">
                                        <label htmlFor="cateId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="hidden" name="productName" value={newCapsule.cateId} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" name="productName" onChange={handleChangeCapsule} value={newCapsule.productName} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                        <input type="text" name="title" onChange={handleChangeCapsule} value={newCapsule.title} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter title" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="output" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">output</label>
                                        <input type="text" name="output" onChange={handleChangeCapsule} value={newCapsule.output} id="output" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter output" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="capsuleSize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capsule Size</label>
                                        <input type="text" name="capsuleSize" onChange={handleChangeCapsule} value={newCapsule.capsuleSize} id="capsuleSize" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Capusule Size" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="machineDimension" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Machine Dimension</label>
                                        <input type="text" name="machineDimension" onChange={handleChangeCapsule} value={newCapsule.machineDimension} id="machineDimension" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Machine Dimension" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="shippingWeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Weight</label>
                                        <input type="text" name="shippingWeight" onChange={handleChangeCapsule} value={newCapsule.shippingWeight} id="shippingWeight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Shipping Weight" required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-auto mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="image" name="thumbnail" onChange={handleChangeCapsule} type="file" className="hidden" />
                                        </label>
                                    </div>
                                       
                                </div>
                                <button type="submit" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500">
                                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add new product
                                </button>
                            </form>  

                        </div>
                    </div>
                </div> 
                ):null}

                {(formShow === 2 && addProduct == true )?(       
                    <div id="createProductLiquid" tabIndex={-1} aria-hidden="true" className="overflow-y-auto bg-smoke overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0">
                        <div className="start-30 relative p-4 w-full max-w-2xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div className="relative border-solid border-2 rounded-lg p-4 bg-white shadow dark:border-slate-600 dark:bg-gray-800 sm:p-5">
                                {/* <!-- Modal header --> */}
                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product Liquid</h3>
                                    <button onClick={()=>{setAddProduct(!addProduct)}} type="button" className="ml-12 text-gray-400 bg-transparent hover:bg-slate-400 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-add="createProductModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form onSubmit={handleAddLiquid} encType="multipart/form-data"  >
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                        <div className="hidden">
                                            <label htmlFor="cateId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="hidden" name="productName" value={newLiquid.cateId} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="text" name="productName" onChange={handleChangeLiquid} value={newLiquid.productName} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                            <input type="text" name="title" onChange={handleChangeLiquid} value={newLiquid.title} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter title" required/>
                                        </div>
    
                                        <div>
                                            <label htmlFor="airPressure" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">airPressure</label>
                                            <input type="text" name="airPressure" onChange={handleChangeLiquid} value={newLiquid.airPressure} id="airPressure" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Air Pressure" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="airVolume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capsule Size</label>
                                            <input type="text" name="airVolume" onChange={handleChangeLiquid} value={newLiquid.airVolume} id="airVolume" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Air Volume" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="fillingSpeed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Machine Dimension</label>
                                            <input type="text" name="fillingSpeed" onChange={handleChangeLiquid} value={newLiquid.fillingSpeed} id="fillingSpeed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Filling Speed" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="fillingRange" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Weight</label>
                                            <input type="text" name="fillingRange" onChange={handleChangeLiquid} value={newLiquid.fillingRange} id="fillingRange" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Filling Range" required/>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-auto mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="image" name="thumbnail" onChange={handleChangeLiquid} type="file" className="hidden" />
                                            </label>
                                        </div>
                                        <button onClick={()=>{setAddProduct(!addProduct)}} type="submit" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Add new product
                                        </button>   
                                    </div>
                                </form>            
                            </div>
                        </div>
                    </div> 
                ):null}

                {(formShow === 3 && addProduct == true )?(       
                    <div id="createProductTablet" tabIndex={-1} aria-hidden="true" className="overflow-y-auto bg-smoke overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0">
                        <div className="start-30 relative p-4 w-full max-w-2xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div className="relative border-solid border-2 rounded-lg p-4 bg-white shadow dark:border-slate-600 dark:bg-gray-800 sm:p-5">
                                {/* <!-- Modal header --> */}
                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product Tablet</h3>
                                    <button onClick={()=>{setAddProduct(!addProduct)}} type="button" className="ml-12 text-gray-400 bg-transparent hover:bg-slate-400 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-add="createProductModal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form onSubmit={handleAddTablet} encType="multipart/form-data"  >
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                        <div className="hidden">
                                            <label htmlFor="cateId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="hidden" name="productName" value={newTablet.cateId} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="text" name="productName" onChange={handleChangeTablet} value={newTablet.productName} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                            <input type="text" name="title" onChange={handleChangeTablet} value={newTablet.title} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter title" required/>
                                        </div>
    
                                        <div>
                                            <label htmlFor="modelNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model Number</label>
                                            <input type="text" name="modelNumber" onChange={handleChangeTablet} value={newTablet.modelNumber} id="modelNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Model Number" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="dies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dies</label>
                                            <input type="text" name="dies" onChange={handleChangeTablet} value={newTablet.dies} id="dies" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Dies" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="maxPressure" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Pressure</label>
                                            <input type="text" name="maxPressure" onChange={handleChangeTablet} value={newTablet.maxPressure} id="maxPressure" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Max Pressure" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="maxDiameterOfTablet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Diameter Of Tablet</label>
                                            <input type="text" name="maxDiameterOfTablet" onChange={handleChangeTablet} value={newTablet.maxDiameterOfTablet} id="maxDiameterOfTablet" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Max Diameter Of Tablet" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="maxDepthOfFill" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Depth Of Fill</label>
                                            <input type="text" name="maxDepthOfFill" onChange={handleChangeTablet} value={newTablet.maxDepthOfFill} id="maxDepthOfFill" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Max Depth Of Fill" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="productionCapacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Production Capacity</label>
                                            <input type="text" name="productionCapacity" onChange={handleChangeTablet} value={newTablet.productionCapacity} id="productionCapacity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Production Capacity" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="machineSize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Machine Size</label>
                                            <input type="text" name="machineSize" onChange={handleChangeTablet} value={newTablet.machineSize} id="machineSize" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Machine Size" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="netWeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Net Weight</label>
                                            <input type="text" name="netWeight" onChange={handleChangeTablet} value={newTablet.netWeight} id="netWeight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Net Weight" required/>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-auto mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="image" name="thumbnail" onChange={handleChangeTablet} type="file" className="hidden" />
                                            </label>
                                        </div>
                                         
                                    </div>
                                    <button onClick={()=>{setAddProduct(!addProduct)}} type="submit" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-600 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500">
                                        <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add new product
                                    </button>  
                                </form>            
                            </div>
                        </div>
                    </div> 
                ):null}

            </div>
        
        </>
    )
    
}
export default Product;