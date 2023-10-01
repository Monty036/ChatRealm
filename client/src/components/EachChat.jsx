import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeCurrChatRoom } from "../slices/chatRoomSlice";

const EachChat = ({ contact }) => {
  const { userinfo } = useSelector((state) => state.auth);
  const { currChatRoom } = useSelector((state) => state.chatRoom);

  const dispatch = useDispatch();
  let name = contact?.title ? contact?.title : contact.users[0].fullname;
  let username = contact?.title ? '' : contact?.users[0].username;
  let lastMessage = contact?.chats.slice(-1)[0];
  return (
    <div className={`${ currChatRoom === contact?._id ? 'bg-blue-400' : 'bg-blue-900'} 
      m-1  bg-opacity-50 rounded cursor-pointer ease-in-out duration-300 text-slate-200`} 
      onClick={() => { dispatch(changeCurrChatRoom(contact._id)) }}
    >
      <div className="w-full flex flex-row items-center p-2 ">
        <img src={contact?.chatRoomPic} className="rounded-full ml-3 h-[50px] object-cover" alt="" />
        <div className="flex flex-col self-center w-full">
          <div className="flex flex-row ">
            <div className="w-full self-end ml-2">{name} 
              {
                username.length ? <span className="text-sm text-opacity-70"> @{username}</span> : null
              }
            </div>
            <div className="whitespace-nowrap text-xs">{''}</div>
          </div>

          <div className="ml-2 text-opacity-50 text-sm">{lastMessage?.user?.username === userinfo?.username ? 'You: ' : ''}{lastMessage?.message}</div>
        </div>

      </div>
    </div>
  );
}

export default EachChat;