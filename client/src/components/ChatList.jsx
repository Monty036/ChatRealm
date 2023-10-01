import { useSelector } from "react-redux";
import EachChat from "./EachChat";
import { BsFillChatFill } from 'react-icons/bs';

function ChatList() {

  const { chatRoom } = useSelector((state) => state.chatRoom);
  return (
    <>
      {
        chatRoom?.length ? chatRoom.map((contact) => {
          return (
            <div  key={contact?._id} className="h-full py-1">
              <EachChat contact={contact} />
            </div>
          )}
        ) :
        <div className="h-full flex justify-center items-center">
          <div className="absolute top-[50%] translate-y-[-50%] text-center font-poppins">
            <div className="w-[200px] h-[200px] shadow-lg bg-blue-800 bg-opacity-30 rounded-full flex justify-center items-center">
              <BsFillChatFill className="w-[100px] h-[100px] text-blue-900 overflow-visible opacity-70 stroke-white stroke-1 box-border" />
            </div>
            <p className="font-right mt-4 text-white/70">Start a New Chat</p>
          </div>
        </div>
      }
    </>
    );
}
  
  export default ChatList;