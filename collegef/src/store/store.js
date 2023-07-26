import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";
import { courseReducer } from "./courseRelated/courseSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        course:courseReducer,
    }
})
export default store;