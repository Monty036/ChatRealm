import React from "react";
import { logout } from '../slices/authSlice';
import { resetChatRoom } from "../slices/chatRoomSlice";
import { useLogoutMutation } from '../api/userApiSlice';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BiArrowBack } from 'react-icons/bi';

const Profile = ({ setOpenProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutApi().unwrap();
      if (res.message) if (process.env.NODE_ENV === 'development') toast(res.message);
      dispatch(logout());
      dispatch(resetChatRoom());
      navigate('/');
    } catch (err) {
      toast(err?.data?.message || err);
    }
  }

  return (
    <div className="min-w-[400px] w-1/3 flex flex-col mr-2 p-2 h-full border border-x-none rounded-lg text-slate-200">
      <div className="min-h-[110px] bg-blue-700 bg-opacity-20 flex flex-row items-end px-4">
        <div className="w-full flex flex-row justify-center items-center py-5">
          <BiArrowBack className="text-lg text-slate-200 cursor-pointer m-2" onClick={ () => { setOpenProfile(false) } } />
          <div className="text-lg w-full self-end ml-2 text-slate-200">Profile</div>
        </div>
      </div>

      <button onClick={handleLogout} className="bg-opacity-50 cursor-pointer bg-blue-600 w-full rounded p-2 my-2">
        Logout
      </button>
    </div>


  );
}

export default Profile;