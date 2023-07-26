import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    courseDetails:[],
    coursesList:[],
    loading:false,
    error:null,
    response:null,
}

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.coursesList = action.payload;
            state.loading = false;
            state.response = null;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.response = null;
            state.error = action.payload;
        },
        getSucessC: (state,action) => {
            state.loading = false;
            state.coursesList = action.payload;
            state.error = null;
            state.response = null;
        },
        getEmpty: (state) => {
            state.loading = false;
            state.coursesList =[];
        }
    }
})

export const {getRequest,getSuccess,getFailed,getError,getSucessC,getEmpty} = courseSlice.actions;

export const courseReducer = courseSlice.reducer;