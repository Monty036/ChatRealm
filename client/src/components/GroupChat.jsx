import React from "react";


const EachChat=({Groupname,name,lastMessage,lastTime,userImage})=>{
    return(
        <div className="bg-blue-900 bg-opacity-30 m-1 rounded">
            <div className="w-full flex flex-row items-center p-2 ">
            <img src={userImage} className="rounded-full ml-3 " alt="" />
                <div className="flex flex-col self-center w-full">
                    <div className="flex flex-row ">
                        <div className="w-full self-end ml-2">{Groupname}</div>
                        <div className="whitespace-nowrap text-xs">{lastTime}</div>
                    </div>
                    
                    <div className="ml-2 text-white/50 text-xs">{name}: {lastMessage}</div>
                </div>
    
            </div>
        </div>
    );
}

export default EachChat;