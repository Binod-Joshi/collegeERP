import React from 'react'
import './DeleteConfirm.css'
import { useDispatch, useSelector } from 'react-redux'
import { cancelDelete, deleteAll, deleteOne } from '../../store/userRelated/userHandle'
import { deleteOneCourse } from '../../store/courseRelated/courseHandle'
// import { useNavigate } from 'react-router-dom'


const DeleteConfirm = ({role,selectedId}) => {
    const {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch();

    console.log(selectedId);
    // const navigate = useNavigate();
    const deleteAccount = async() => {
        console.log(selectedId);
        if (selectedId === null || selectedId === "") {
          // If selectedId is null or an empty string
          dispatch(deleteAll(currentUser, role));
          dispatch(cancelDelete());
          console.log("null");
        } else {
          // If selectedId has a value
         if(role === "courses"){
          dispatch(deleteOneCourse(currentUser, role, selectedId));
          console.log(selectedId);
          dispatch(cancelDelete());
         }else{
          dispatch(deleteOne(currentUser, role, selectedId));
          console.log(selectedId);
          dispatch(cancelDelete());
         }
        }
        
        
    }
    const cancel = () => {
        
        dispatch(cancelDelete());
    }
  return (
    <div className="logouts1">
    <div className='logout'>
        <h1 className='h1'>Confirm to delete.</h1>
      <div className="buttons">
        <button onClick={deleteAccount} className='ok' >Ok</button>
        <button onClick={cancel} className='cancel'>Cancel</button>
      </div>
    </div>
    </div>
  )
}

export default DeleteConfirm
