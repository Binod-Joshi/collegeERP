import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gettingNotice } from '../../store/userRelated/userHandle';

const ShowNotice = () => {
    const {currentUser,noticeList,loading} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let role = currentUser?.role;
    let collegeid;
    if (role === "Admin") {
      collegeid = currentUser?._id;
    } else if (role === "Teacher") {
      collegeid = currentUser?.collegeid;
    }else{
        collegeid = currentUser?.collegeid;
    }

    useEffect(() => {
        dispatch(gettingNotice(collegeid,currentUser));
    },[])

    console.log(noticeList);

  return (
    <div>
      <h1>Notice</h1>
      {!loading? (noticeList?.length > 0 ? (noticeList?.map((notice,index) => {
                return(
                <div key={index} >
                    <div style={{ whiteSpace: 'pre-wrap' }}>Content: {notice?.notice}</div>
                    <h5 style={{marginTop:"10px"}} > By {notice?.role}</h5>
                    <h4 style={{marginTop:"10px"}} >Date: {notice?.date?.split("T")[0]}</h4>
                    <hr />
                </div>
                )
              })):<h3>No notice.</h3>):<div className='courseDetail'><h3>Loading...</h3></div>}
    </div>
  )
}

export default ShowNotice
