import { getError, getFailed, getRequest, getSuccess,getSucessC,getEmpty } from "./courseSlice";


export const totalCourses = (currentUser) => async(dispatch) => {
    dispatch(getRequest());
    try {
        let result = await fetch(`http://localhost:5000/api/courses/getcourses`,{
            method:"get",
            headers:{
                Authorization:`Bearer ${currentUser?.token}`,
            }
        });
      result = await result.json();
      if(result[0]){
          dispatch(getSuccess(result));
        }else{
            dispatch(getFailed("No Course were added till now."));
        }
    } catch (error) {
       dispatch(getError(error));
   }
  }

  // deleteOne

export const deleteOneCourse = (currentUser, role, selectedId) => async (dispatch) => {
    dispatch(getRequest());
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
        if(role === "courses"){
          dispatch(getSucessC(result));
        }
      } else {
        dispatch(getEmpty());
      }
    } catch (error) {
    }
  };