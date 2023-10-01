import React from 'react';
import { useSelector } from 'react-redux';


const ChatWindow = () => {
  const { userinfo } = useSelector((state) => state.auth)
  const { chatRoom, currChatRoom } = useSelector((state) => state.chatRoom);
  const data = chatRoom?.find((room) => room?._id === currChatRoom);

  let name = data?.title ? data?.title : data.users[0].fullname;
  let username = data?.title ? '' : data?.users[0].username;

  return (
    <div className="w-full h-full rounded-lg border border-white  flex flex-col">
      <div className="py-2 w-full flex flex-row items-center bg-blue-500 bg-opacity-10  ml-0.3">
        <img src={data?.chatRoomPic} className="rounded-full ml-3 h-[40px] object-cover" alt="" />
        <div className="ml-3 text-lg font-poppins text-bold text-white">
          {name}
          {
            username.length ? <span className="text-sm text-opacity-70"> @{username}</span> : null
          }
        </div>
      </div>
      <div className='flex flex-col px-[10%] pb-4 text-sm justify-end flex-grow'>
          {
            data?.chats.map((chat) => {
              return (
                <div className={`${chat.user === userinfo?.username ? 'bg-blue-400 self-start': 'bg-sky-500 self-end' } 
                bg-opacity-70 px-2 py-1 m-1 text-slate-200 rounded-md`}>
                  { chat.message }
                </div>
              )
            })
          }
      </div>
      <div className="w-full px-3 py-3 bg-blue-500 bg-opacity-20  flex flex-row mt-auto">
        <div className="flex flex-row justify-center items-center w-full">
          <input type="text" placeholder={`Type a message...`}
            className="w-full bg-white bg-opacity-10 h-[33px] rounded-lg outline-none  py-4 px-4 text-sm text-white placeholder-white" />
          <svg className="h-8 w-8 text-white ml-4" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="10" y1="14" x2="21" y2="3" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
        </div>
      </div>

    </div>
  )
}

export default ChatWindow;