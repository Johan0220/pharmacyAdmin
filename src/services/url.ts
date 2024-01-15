const url = {
    BASE_URL: "https://pharmacyonline.azurewebsites.net/api",
    PRODUCT:{
        ADD: {
            CAPSULE:"/product/admin/create/product/capsule",
            LIQUID:"/product/admin/create/product/liquid",
            TABLET:"/product/admin/create/product/tablet",
        },
        DELETE:"/product/admin/delete?productId=",
        UPDATE: {
            CAPSULE:"/product/admin/update/product/capsule",
            LIQUID:"/product/admin/update/product/liquid",
            TABLET:"/product/admin/update/product/tablet",
        },
        LOAD: {
            DETAIL:"/product/getdetail?idProduct=",
            DEFAULT:"/product?",
            SEARCH:"search=",
            CATEGORY:"&cate=",
            SORT:"&sorting=",
            PAGE:"&page=",
        }
    },
    USER:{
        LOGIN: "/authentication/login",
        LOGOUT: "/authentication/candidate/logout",
        REFRESHTOKEN: "/authentication/candidate/refreshtoken",
        PROFILE: "/manageCandidates/candidate/getinforms/token",
        EDIT: "/manageCandidates/candidate/update/inform",
        LOAD: "/manageCandidates/admin/search&getlist?",
        SEARCH: "search=",
        PAGE: "&page=",
        ONOFF: "/manageCandidates/admin/toggle/user?id="
    },
    RESUME:{
        ACCEPTORCANCEL: "/profile/admin/approved",
        SEARCH:"/profile/admin/search?search=",
        DETAIL: "/profile/admin/getdetail?IdProfile=",
        LOAD: {
            DEFAULT:"/profile/admin/getlist/",
            PEDING:"submitted",
            RECEIVED:"history",
            FILTER:"isQualified=",
            PAGE:"page="
        },
        DOWLOAD: "/Profile/admin/download/fileCV?idProfileDetail=",
        STATISTICAL:"/Statistic/admin/get",
    },
    CATEGORY:{
        LOAD:"/product/getall/category",
        DELETE:"/category/category/delete?id=3",
        ADD:"/category/category/post-cate",
        UPDATE:"/category/category/update-cart"
    },
    STATISTICAL: "/Statistic/admin/get"
}
export default url;