import {
  authSuccess,
  authRequest,
  authFailed,
  authError,
  authLogout,
  stuffAdded,
  getSuccess,
  authSuccessGetMessage,
  getSuccessT,
  getSuccessS,
  getdeletedcomponent,
  getcanceldeletedcomponent,
  authEmpty,
  getSuccessForParticularCourseStudent,
  authSucessForParticularSubject,
  authSucessForParticularSubjectM,
  authSucessForStudentA,
  authSucessForStudentM,
  authSucessForStudentTeachers,
  authSuccessForNotice,
  
} from "./userSlice";

export const loginUser = (fields, role) => async (dispatch) => {
  const { email, password } = fields;
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/api/auth/login${role}`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.role) {
      dispatch(authSuccess(result));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const registerUser = (fields, currentUser) => async (dispatch) => {
  const { role } = fields;
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/api/auth/register${role}`, {
      method: "post",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    result = await result.json();
    if (result.email && result.rollNo) {
      dispatch(stuffAdded());
    } else if (result?.email && result?.course) {
      dispatch(stuffAdded());
    } else if (result.email) {
      dispatch(authSuccess(result));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const handleResetPassword = (email,role) => async (dispatch) => {
  dispatch(authRequest());
  const fields = {email,role}
  try {
    let result = await fetch(`http://localhost:5000/api/auth/resetpassword`, {
      method: "post",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.status === 200) {
      dispatch(authSuccessGetMessage(result.message));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(authLogout());
};

// ADD COURSE
export const addCourse = (fields, currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/api/courses/addcourse`, {
      method: "post",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    result = await result.json();
    if (result.course) {
      dispatch(stuffAdded());
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

// show students
export const ShowStudentsList = (currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/api/students/getstudents`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    result = await result.json();
    if (result[0]) {
      dispatch(getSuccess(result));
    } else {
      dispatch(authEmpty());
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

//SingleCourseStudentDetail
export const SingleCourseStudentDetail =
  (fields, currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
      let result = await fetch(
        `http://localhost:5000/api/students/singlecoursesstudentlist`,
        {
          method: "post",
          body: JSON.stringify(fields),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      result = await result.json();
      if (result[0]) {
        dispatch(getSuccessForParticularCourseStudent(result));
      } else {
        dispatch(getSuccessForParticularCourseStudent(result.message));
      }
    } catch (error) {
      dispatch(authError(error));
    }
  };

// show Teachers
export const ShowTeachersList = (currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/api/teachers/getteachers`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    result = await result.json();
    if (result[0]) {
      dispatch(getSuccessT(result));
    } else {
      dispatch(authEmpty());
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

// delete all
export const deleteAll = (currentUser, role) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/api/${role}/deleteAll`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    result = await result.json();
    if (result[0]) {
      if (role === "teachers") {
        dispatch(getSuccessT(result));
      } else if (role === "students") {
        dispatch(getSuccessS(result));
      }
    } else {
      if (role === "teachers") {
        dispatch(getSuccessT([]));
      } else if (role === "students") {
        dispatch(getSuccessS([]));
      }
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

// deleteOne

export const deleteOne =
  (currentUser, role, selectedId) => async (dispatch) => {
    dispatch(authRequest());
    try {
      const requestBody = { selectedId }; // Create an object with the selectedId

      let result = await fetch(`http://localhost:5000/api/${role}/deleteOne`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      result = await result.json();

      if (result[0]) {
        if (role === "teachers") {
          dispatch(getSuccessT(result));
        } else if (role === "students") {
          dispatch(getSuccessS(result));
        }
      } else {
        dispatch(authEmpty());
      }
    } catch (error) {
      dispatch(authError(error));
    }
  };

// to get deleteconfirm show component
export const setDeletedComponents = () => (dispatch) => {
  dispatch(getdeletedcomponent());
};

// to cancel delete confirm (to undisplay component)
export const cancelDelete = () => (dispatch) => {
  dispatch(getcanceldeletedcomponent());
};




//for teacherblock -->> add attendance
export const takeAttendance = (fields, currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/attendance/takeattendance`,
      {
        method: "post",
        body: JSON.stringify(fields, currentUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSuccessGetMessage(result.message));
  } catch (error) {
    dispatch(authError(error));
  }
};

// get all attendance of the particular student for particular teacher

export const getAttendance = (fields, currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/attendance/getattendance`,
      {
        method: "post",
        body: JSON.stringify(fields, currentUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSucessForParticularSubject(result));
  } catch (error) {
    dispatch(authError(error));
  }
};

// for addding marks
export const takeMark = (fields, currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/mark/takemark`,
      {
        method: "post",
        body: JSON.stringify(fields, currentUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSuccessGetMessage(result.message));
  } catch (error) {
    dispatch(authError(error));
  }
};

// for getting marks of particular subject of particulr teacher
export const getMark = (fields, currentUser) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/mark/getmark`,
      {
        method: "post",
        body: JSON.stringify(fields, currentUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSucessForParticularSubjectM(result));
  } catch (error) {
    dispatch(authError(error));
  }
};



// for student block

// getting all attendance of a student
export const totalAttendanceOfStudent =(currentUser,id) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/attendanceofstudent/getattendance/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSucessForStudentA(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 

// getting all mark of a student
export const totalMarkOfStudent =(currentUser,id) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/markofstudent/getmark/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSucessForStudentM(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 

// getting teachers of particular course details
export const totalTeachersOfStudent = (fields,currentUser) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/students/getteachers`,
      {
        method: "post",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSucessForStudentTeachers(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 

// for sending notice
export const sendNotice = (fields,currentUser) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/notice/setnotice`,
      {
        method: "post",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(stuffAdded());
  } catch (error) {
    dispatch(authError(error));
  }

} 
// getting notice 
export const gettingNotice = (collegename,currentUser) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `http://localhost:5000/api/notice/getnotice/${collegename}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    result = await result.json();
    dispatch(authSuccessForNotice(result));
  } catch (error) {
    dispatch(authError(error));
  }

} 