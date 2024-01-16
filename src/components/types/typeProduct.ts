
type ProductSlice = {
    id: number;
    name: string;
    price: number;
    qty: number;
    description?: string;
    gender_id: 0;
    color_id: 0;
    brand_id: 0;
    size_id: 0;
    thumbnail?: string;
    category_id: number;  
}
type UpdateCapsule = {
    [key: string]: any;
    id: number; 
    productName: string;
    title: string;
    thumbnail?: File;
    output: string;
    capsuleSize: string;
    machineDimension: string;
    shippingWeight: string;     
    
}
type UpdateLiquid = {
    [key: string]: any;
    id: number;
    productName: string;
    title: string;
    thumbnail?: File;
    airPressure: string;
    airVolume: string;
    fillingSpeed: string;
    fillingRange: string        
}
type UpdateTablet = {
    [key: string]: any;
    id: 12;
    productName: string;
    title: string;
    thumbnail?: File;
    modelNumber: string;
    dies: string;
    maxPressure: string
    maxDiameterOfTablet: string;
    maxDepthOfFill: string;
    productionCapacity: string;
    machineSize: string;
    netWeight: string    
    
}
type NewCapsule = {
    [key: string]: any;
    cateId: number;
    productName: string;
    title: string;
    thumbnail?: File;
    output: string;
    capsuleSize: string;
    machineDimension: string;
    shippingWeight: string;
}

type NewLiquid = {
    [key: string]: any;
    cateId: number;
    productName: string;
    title: string;
    thumbnail?: File;
    airPressure: string;
    airVolume: string;
    fillingSpeed: string;
    fillingRange: string
}

type NewTablet = {
    [key: string]: any;
    cateId: number;
    productName: string;
    title: string;
    thumbnail?: File;
    modelNumber: string;
    dies: string;
    maxPressure: string;
    maxDiameterOfTablet: string;
    maxDepthOfFill: string;
    productionCapacity: string;
    machineSize: string;
    netWeight: string
}


type ProductDetail =  {
    [key: string]: any;
    id: number;
    productName: string;
    title: string;
    thumbnail: string;
    cateId: number;
    productDetailId: number;
    cateGet: {
    cateName: string
    };
    tabletP: {
        modelNumber: string;
        dies: string;
        maxPressure: string;
        maxDiameterOfTablet: string;
        maxDepthOfFill: string;
        productionCapacity: string;
        machineSize: string;
        netWeight: string
    }   
};
type ProductSearch =  {
    id: number;
    productName: string;
    title: string;
    thumbnail: string;
    cateGet: {
        cateName: string
    };
    isNew: string 
};
export type {UpdateCapsule,UpdateLiquid,UpdateTablet,NewCapsule,NewLiquid,NewTablet,ProductDetail,ProductSlice,ProductSearch}