import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { totalMarkOfStudent } from "../../../store/userRelated/userHandle";
import AllSubjectMarkS from "../../toast/AllSubjectMarkS";


const MarkOfOneSt = () => {
  const {currentUser,markOfStudentList,loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(totalMarkOfStudent(currentUser))
  },[]);

  console.log(loading);
  return (
    <>
    {loading === true && <h1 style={{marginTop:"50px"}} className="courseDetail"> loading...</h1> }
{!loading &&<AllSubjectMarkS markOfStudentList ={markOfStudentList}/>}
    </>
  )
}

export default MarkOfOneSt
