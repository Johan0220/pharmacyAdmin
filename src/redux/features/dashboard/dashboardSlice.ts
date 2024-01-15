import { createSlice } from "@reduxjs/toolkit";
type loadCategoryState = {
    category: any | null;
    isFetching: boolean;
    error: boolean;
}
type InitialState = {
    loadCategory: loadCategoryState;
}
const initialState: InitialState = {
    loadCategory:{
        category: null,
        isFetching: false,
        error: false,
    },  
}

const dashboardSlice = createSlice({
    
    name: 'dashboard',
    initialState,
    reducers:{
        loadCategoryStart: (state) => {
            state.loadCategory.isFetching = true;
        },
        loadCategorySuccess: (state,action) => {
            state.loadCategory.category = action.payload;
            state.loadCategory.isFetching = false;
            state.loadCategory.error = false;
        },
        loadCategoryFailed: (state) => {
            state.loadCategory.isFetching = false;
            state.loadCategory.error = true;
        },
    },
});

export const{
    loadCategoryStart,
    loadCategoryFailed,
    loadCategorySuccess,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;