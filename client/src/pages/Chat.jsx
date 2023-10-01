import ChatList from "../components/ChatList";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setChatRoom } from "../slices/chatRoomSlice";
import { useGetChatMutation } from "../api/chatApiSlice";
import Profile from '../components/Profile';
import ChatWindow from "../components/ChatWindow";
import { FiUserPlus } from 'react-icons/fi';
import FindUserModal from "../components/FindUserModal";
import { io } from "socket.io-client";
import { updateFriendRequestState } from "../slices/authSlice";



const Chat = () => {

  const { userinfo } = useSelector((state) => state.auth);
  const { currChatRoom } = useSelector((state) => state.chatRoom)

  // States
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddFriends, setOpenAddFriends] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getChatApi] = useGetChatMutation();


  useEffect(() => {
    if (!userinfo) navigate('/');
  }, [userinfo, navigate]);

  async function getChats() {
    try {
      const res = await getChatApi().unwrap();
      if (res.message) if (process.env.NODE_ENV === 'development') toast(res.message);
      dispatch(setChatRoom(res.chatRoom));
      dispatch(updateFriendRequestState(res.friendRequests));
    } catch (err) {
      toast(err?.data?.message || err);
    }
  }

  useEffect(() => {
    getChats();
    // Initialize Socket.io connection
    const SOCKET_URL = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URI: ''}/api/socket`;
    const socket = io(SOCKET_URL, { withCredentials: true });
    socket.on('connect', () => {
      if(process.env.NODE_ENV === 'development') toast('Websockets Connected.');
    });
    // Handle Connection error
    socket.on('connect_error', (err) => {
      toast(err.message);
    })

    // Disconnect on unmount
    return  () => {
      socket.disconnect();
      if(process.env.NODE_ENV === 'development') toast('Websockets Disconnected.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ backgroundImage: `url(https://i.ibb.co/0J4V1cs/chat-Background.jpg)` }} className=" w-full h-[100vh] bg-cover p-2">
      <div className="w-full h-full flex flex-row font-poppins">
        {
          openProfile ? <Profile setOpenProfile={setOpenProfile} /> :
            <div className="min-w-[400px] w-1/3 h-full flex flex-col text-white mr-2 rounded-lg border border-white relative">
              <div className="w-full flex flex-row items-center  bg-blue-800 bg-opacity-20">
                <div
                  className="flex flex-row items-center text-slate-200 hover:bg-slate-200 
                  hover:bg-opacity-20 ease-in-out m-2 cursor-pointer rounded-lg duration-300"
                  onClick={() => { setOpenProfile(true) }}
                >
                  <img src={userinfo?.profilePic}
                    className="h-[40px] object-cover my-2 rounded-full ml-3 mr-3" alt=""
                  />
                  <div className="mr-2 overflow-hidden whitespace-nowrap font-poppins">
                    {userinfo?.fullname} <span className="text-white text-opacity-70">@{userinfo?.username}</span>
                  </div>
                </div>

                <div className="flex flex-grow ml-auto justify-end m-3" >
                  <div className="p-3 bg-blue-700 bg-opacity-40 rounded-[100%] cursor-pointer hover:bg-blue-500 ease-in-out duration-300 hover:rounded-lg"
                    onClick={() => { setOpenAddFriends(true); }}
                  >
                    <FiUserPlus className="" /> 
                  </div>
                </div>

              </div>
              <div className="w-full px-3 py-2 bg-blue-800 bg-opacity-20  flex flex-row justify-center items-center">
                <input type="text" placeholder="Search Chats..."
                  className="placeholder-white w-full bg-white bg-opacity-20  h-[33px] rounded-lg outline-none px-4 text-sm text-white/70" />

              </div>
              <Scroll>
                <ErrorBoundary>
                  <div className="h-full">
                    <ChatList />
                  </div>
                </ErrorBoundary>
              </Scroll>
            </div>
        }
        {
          currChatRoom !== null ? <ChatWindow /> :
          <div className="w-full h-full flex justify-center items-center border border-white rounded-lg">
            <div className="">

            </div>
          </div>
        }

      </div>
      { openAddFriends ? <FindUserModal setOpenAddFriends={setOpenAddFriends} /> : null }
    </div>
  );
}

export default Chat;