
import { ProductSlice,ProductDetail } from '@/components/types/typeProduct';
import { createSlice } from '@reduxjs/toolkit';

type ProductState = {
    products:{
        list: ProductSlice[];
        productDetail: ProductDetail | null;
        isFetching : boolean;
        error: boolean;
    },
    total:{
        totalProduct: number;
    }
}

const initialState: ProductState = {
    products:{
        list: [],
        productDetail:null,
        isFetching: false,
        error: false,

    },
    total:{
        totalProduct: 0,
    }

}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        totalProduct: (state,action) =>{
            state.total.totalProduct = action.payload;
        },
        loadProductStart: (state) => {
            state.products.isFetching = true;
        },
        loadProductSuccess: (state, action) => {
            state.products.list = action.payload;
            state.products.isFetching = false;
            state.products.error = false;
        },
        loadProductFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },
        loadPageProductSuccess: (state, action) => {
            state.products.list = [...state.products.list, ...action.payload];
        },
        loadProductDetailStart: (state) => {
            state.products.isFetching = true;
        },
        loadProductDetailSuccess: (state, action) => {
            state.products.productDetail = action.payload;
            state.products.isFetching = false;
        },
        loadProductDetailFailed: (state) => {
            state.products.isFetching = false;
        },
        addProductStart: (state) => {
            state.products.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            // Thêm sản phẩm vào đầu danh sách
            state.products.list.unshift(action.payload);
            // Nếu danh sách vượt quá 10 sản phẩm, loại bỏ sản phẩm cuối cùng
            if (state.products.list.length > 10) {
              state.products.list.pop();
            }
            state.products.isFetching = false;
        },
        addProductFailed: (state) => {
            state.products.isFetching = false;
        },
        deleteProductStart: (state) =>{
            state.products.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.list = state.products.list.filter((product) => product.id !== action.payload);
        },
        deleteProductFailed:(state) => {
            state.products.isFetching = false;
        },
        updateProductStart: (state) =>{
            state.products.isFetching = true;
        },
        updateProductSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.productDetail = action.payload;
        },
        updateProductFailed:(state) => {
            state.products.isFetching = false;
        }
    }
})
export const {
    totalProduct,
    loadProductStart,
    loadProductSuccess,
    loadProductFailed,
    addProductStart,
    addProductSuccess,
    addProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    loadProductDetailStart,
    loadProductDetailSuccess,
    loadProductDetailFailed,
    updateProductStart,
    updateProductSuccess,
    updateProductFailed,
    loadPageProductSuccess,
    } = productSlice.actions;
export default productSlice.reducer;