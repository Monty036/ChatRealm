import ChatList from "../components/ChatList";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';

import Profile from '../components/Profile';

const userData = {
        "gender": "female",
        "name": {
          "title": "Miss",
          "first": "Jennie",
          "last": "Nichols"
        },
        "location": {
          "street": {
            "number": 8929,
            "name": "Valwood Pkwy",
          },
          "city": "Billings",
          "state": "Michigan",
          "country": "United States",
          "postcode": "63104",
          "coordinates": {
            "latitude": "-69.8246",
            "longitude": "134.8719"
          },
          "timezone": {
            "offset": "+9:30",
            "description": "Adelaide, Darwin"
          }
        },
        "email": "jennie.nichols@example.com",
        "login": {
          "uuid": "7a0eed16-9430-4d68-901f-c0d4c1c3bf00",
          "username": "yellowpeacock117",
          "password": "addison",
          "salt": "sld1yGtd",
          "md5": "ab54ac4c0be9480ae8fa5e9e2a5196a3",
          "sha1": "edcf2ce613cbdea349133c52dc2f3b83168dc51b",
          "sha256": "48df5229235ada28389b91e60a935e4f9b73eb4bdb855ef9258a1751f10bdc5d"
        },   
        "dob": {
          "date": "1992-03-08T15:13:16.688Z",
          "age": 30
        },
        "phone": "(272) 790-0888",
        "cell": "(489) 330-2385",
        "id": {
          "name": "SSN",
          "value": "405-88-3636"
        },
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/75.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
        },
        "nat": "US"
      }

const currChat={
  
    name: "Alice Smith",
    online: "online",
    userImage: "https://randomuser.me/api/portraits/thumb/men/70.jpg",
    chats:[{from:"Jennie",
        msg:"Hey!  whats Up",
        time:"10:00 AM"
      } , 
      {from:"Alice",
        msg:"Nothing Much",
        time:"10:02 AM"
      }
    ]
  
}


const Chat = () => {

  const { userinfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi, { isloading }] = useLogoutMutation();

  useEffect(() => {
    if(!userinfo) navigate('/');
  }, [userinfo, navigate]);

  const handleLogout = async () => {
    try {
      const res = await logoutApi().unwrap();
      if(res.message) toast(res.message);
      dispatch(logout());
      navigate('/');
    } catch (err) {
      toast(err?.data?.message || err);
    }
  }
  
  return (
    <div style={{backgroundImage: `url(https://i.ibb.co/0J4V1cs/chat-Background.jpg)`}} className=" w-full h-[100vh] bg-cover p-2">
        <div className="w-full h-full flex flex-row">
            <div className="min-w-[400px] w-1/3 h-full flex flex-col text-white mr-2 rounded-lg border border-white">
                <div className='h-full w-full'>
                          <Profile></Profile>
                </div>
                {/* <div className="w-full flex flex-row items-center  bg-blue-800 bg-opacity-20">
                    <img src={userData.picture.thumbnail} 
                      className="h-[80%] my-2 rounded-full ml-3 mr-3" alt="" 
                    />
                    <div className=" text-lg font-roboto text-bold">
                      {userData.name.first} {userData.name.last}
                    </div>
                    <button onClick={handleLogout}  className="ml-auto bg-opacity-20 cursor-pointer mr-3 bg-white rounded px-2 py-1">
                      Logout
                    </button>
                </div>
                <div className="w-full px-3 py-2 bg-blue-800 bg-opacity-20  flex flex-row justify-center items-center">
                    <input type="text" placeholder="Search Chats..."
                      className="placeholder-white w-full bg-white bg-opacity-20  h-[33px] rounded-lg outline-none px-4 text-sm text-white/70" />
                </div>
                <Scroll>
                    <ErrorBoundary>
                      <div className="h-full">
                        <ChatList/>
                      </div>
                    </ErrorBoundary>
                </Scroll> */}
                
                
            </div>
            <div className="w-full h-full bg-white bg-opacity-0 rounded-lg border border-white  flex flex-col">
                
                <div className="w-full flex flex-row items-center bg-white bg-opacity-20  ml-0.3">
                    <img src={currChat.userImage} className="h-[70%] my-2 rounded-full ml-3 mr-3" alt="" />
                    <div className=" text-lg font-roboto text-bold text-white ">{currChat.name}</div>
                </div>

                <div className="w-full px-3 py-3 bg-white bg-opacity-20  flex flex-row mt-auto ">
                  <div className="flex flex-row justify-center items-center w-full">
                    <input type="text" placeholder="Type a message"
                      className="w-full bg-white bg-opacity-10 h-[33px] rounded-lg outline-none  py-4 px-4 text-sm text-white placeholder-white" />
                    <svg className="h-8 w-8 text-white ml-4"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="10" y1="14" x2="21" y2="3" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>                      </div>
                    
                </div>
                
            </div>
        </div>
    </div>
  );
}

export default Chat;