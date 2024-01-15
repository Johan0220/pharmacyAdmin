
import { createSlice } from "@reduxjs/toolkit";

type USerState = {
    list: User[];
    totalUser: number;
    isFetching: Boolean;
    error: Boolean;

}
type InitialState = {
    users: USerState;
}

const initialState: InitialState = {
    users: {
        list:[],
        totalUser: 0,
        isFetching: false,
        error: false,
    }

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        totalUser: (state,action) => {
            state.users.totalUser = action.payload;
        },
        loadPageUserSuccess: (state, action) => {
            state.users.list = [...state.users.list, ...action.payload];
        },
        getUserStart: (state) => {
            state.users.isFetching = true
        },
        getUserSuccess: (state,action) => {
            state.users.isFetching = false;
            state.users.list = action.payload;
            state.users.error = false;

        },
        getUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        
    }
});
export const {
    totalUser,
    getUserStart,
    getUserSuccess,
    getUserFailed,
    loadPageUserSuccess,
    } = userSlice.actions;
export default userSlice.reducer;