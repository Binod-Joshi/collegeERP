import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  userDetails: [],
  studentsList: [],
  courseStudentsList: [],
  teachersList: [],
  attendanceListForSubject: [],
  markForSubject: [],
  attendanceOfStudentList: [],
  markOfStudentList: [],
  studentTeachers: "",
  noticeList:[],
  loading: false,
  deleteComponent: false,
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
  error: null,
  response: null,
  darkMode: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.status = "success";
      state.loading = false;
      state.currentUser = action.payload;
      state.currentRole = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    authSuccessGetMessage: (state, action) => {
      state.status = "success";
      state.loading = false;
      state.response = action.payload;
    },
    authFailed: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.response = action.payload;
    },
    authError: (state, action) => {
      state.status = "error";
      state.loading = false;
      state.error = action.payload;
    },
    authLogout: (state) => {
      localStorage.removeItem("user");
      state.status = "idle";
      state.currentUser = null;
      state.currentRole = null;
      state.error = null;
    },
    stuffAdded: (state) => {
      state.status = "added";
      state.loading = false;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.studentsList = action.payload;
      state.error = null;
      state.response = null;
    },
    getSuccessForParticularCourseStudent: (state, action) => {
      state.loading = false;
      state.courseStudentsList = action.payload;
      state.error = null;
      // state.response = null;
    },
    getSuccessT: (state, action) => {
      state.loading = false;
      state.teachersList = action.payload;
      state.error = null;
      state.response = null;
    },
    getSuccessS: (state, action) => {
      state.loading = false;
      state.studentsList = action.payload;
      state.error = null;
      state.response = null;
    },
    authEmpty: (state, action) => {
      state.loading = false;
      state.teachersList = action.payload;
      state.studentsList = action.payload;
    },
    getdeletedcomponent: (state) => {
      state.deleteComponent = true;
    },
    getcanceldeletedcomponent: (state) => {
      state.deleteComponent = false;
      state.response = null;
      state.status = "idle";
    },
    authSucessForParticularSubject: (state,action) => {
      state.loading = false;
      state.attendanceListForSubject = action.payload;
      state.error = null;
      state.response = null;
    },
    authSucessForParticularSubjectM: (state, action) => {
      state.loading = false;
      state.markForSubject = action.payload;
      state.error = null;
      state.response = null;
    },
    authSucessForStudentA: (state, action) => {
      state.loading= false;
      state.attendanceOfStudentList = action.payload;
      state.error = null;
      state.response = null;
    },
    authSucessForStudentM: (state, action) => {
      state.loading= false;
      state.markOfStudentList = action.payload;
      state.error = null;
      state.response = null;
    },
    authSucessForStudentTeachers: (state, action) => {
      state.loading= false;
      state.studentTeachers = action.payload;
      state.error = null;
      state.response = null;
    },
    authSuccessForNotice: (state, action) => {
      state.loading= false;
      state.noticeList = action.payload;
      state.error = null;
      state.response = null;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  stuffAdded,
  getSuccess,
  authSuccessGetMessage,
  getSuccessT,
  getSuccessS,
  authEmpty,
  getdeletedcomponent,
  getcanceldeletedcomponent,
  getSuccessForParticularCourseStudent,
  authSucessForParticularSubject,
  authSucessForParticularSubjectM,
  authSucessForStudentA,
  authSucessForStudentM,
  authSucessForStudentTeachers,
  authSuccessForNotice,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
