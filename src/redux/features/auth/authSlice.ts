import { createSlice } from "@reduxjs/toolkit";
type LoginState = {
    currentToken: CurrentToken | null;
    profile: any;
    isFetching: boolean;
    error: boolean;
}
type InitialState = {
    login: LoginState;
}
const initialState: InitialState = {
    login:{
        currentToken: null,
        profile:null,
        isFetching: false,
        error: false,
    },  
}

const authSlice = createSlice({
    
    name: 'auth',
    initialState,
    reducers:{
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state,action) => {
            state.login.currentToken = action.payload;
            state.login.isFetching = false;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutSuccess: (state) => {
            state.login.currentToken = null;
            state.login.isFetching = false;
            state.login.error = false;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        profileSuccess: (state,action) => {
            state.login.isFetching = false;
            state.login.profile = action.payload;
            state.login.error = false;
        },
        profileFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        profileStart: (state) => {
            state.login.isFetching = true;
        }
    },
});

export const{
    loginStart,
    loginFailed,
    loginSuccess,
    logOutStart,
    logOutSuccess,
    profileStart,
    profileFailed,
    profileSuccess,


} = authSlice.actions;
export default authSlice.reducer;