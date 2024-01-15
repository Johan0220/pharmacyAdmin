import { ResumeSlice } from "@/components/types/typeResume";
import { createSlice } from "@reduxjs/toolkit";

type ResumeState = {
    resumes:{
        list: ResumeSlice[];
        totalResume: number
        isFetching: boolean;
        error: boolean;
    }
}

const initialState: ResumeState = {
    resumes:{
        list: [],
        totalResume: 0,
        isFetching: false,
        error: false,
    },  
}

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers:{
        totalResume: (state,action) => {
            state.resumes.totalResume = action.payload;
        },
        loadResumeStart: (state) => {
            state.resumes.isFetching = true;
        },
        loadResumeSuccess: (state,action) => {
            state.resumes.isFetching = false;
            state.resumes.list = action.payload;
            state.resumes.error = false;
        },
        loadPageResumeSuccess: (state, action) => {
            state.resumes.list = [...state.resumes.list, ...action.payload];
        },
        loadResumeFailed: (state) => {
            state.resumes.isFetching = false;
            state.resumes.error = true;
        },
        loadResumeDetailStart: (state) => {
            state.resumes.isFetching = true;
        },
        loadResumeDetailSuccess: (state,action) => {
            state.resumes.isFetching = false;
            state.resumes.list = action.payload;
            state.resumes.error = false;
        },
        loadResumeDetailFailed: (state) => {
            state.resumes.isFetching = false;
            state.resumes.error = true;
        },
        
        
        
    },
});

export const{
    totalResume,
    loadResumeStart,
    loadResumeFailed,
    loadResumeSuccess,
    loadPageResumeSuccess,
    loadResumeDetailStart,
    loadResumeDetailSuccess,
    loadResumeDetailFailed
} = resumeSlice.actions;
export default resumeSlice.reducer;