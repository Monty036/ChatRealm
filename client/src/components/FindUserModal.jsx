import { useEffect, useState } from "react";
import { useFindUserMutation } from "../api/userApiSlice";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { FaUserPlus } from 'react-icons/fa';
import Scroll from "./Scroll";
import { useAddFriendMutation } from "../api/userApiSlice";
import { updateFriendRequestState } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const FindUserModal = ({ setOpenAddFriends }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const [findUser, { isLoading }] = useFindUserMutation();
  const [addFriendRequest, { isLoading: isLoading1 } ] = useAddFriendMutation();

  const handleAddFriend = async (toUsername) => {
    try {
      const res = await addFriendRequest({ toUser: toUsername });
      if(res.message) if(process.env.NODE_ENV === 'development') toast(res.message);
      dispatch(updateFriendRequestState([res.data]));
    } catch (err) {
      toast(err?.message || err);
    }

  }

  useEffect(() => {
    setIsSearching(true);
    if (searchTerm.length === 0) { setResults([]); setIsSearching(false); }
    else {
      const delayDebounce = setTimeout(async () => {
        try {
          const res = await findUser({ friendId: searchTerm });
          if (res.data.message) if (process.env.NODE_ENV === 'development') toast(res.message);
          setIsSearching(false);
          setResults(res.data.data);
        } catch (err) {
          toast(err?.data?.message || err);
        }
      }, 1000);
      return () => clearTimeout(delayDebounce);
    }

  }, [searchTerm]);

  return (
    <div className="fixed left-0 top-0 h-[100vh] w-[100vw] bg-black bg-opacity-50 z-10 flex justify-center items-center">
      <div className="bg-gradient-to-r from-blue-600 to-pink-500 bg-opacity-70 text-slate-200 text-center w-[50%] h-[70%]
      p-5 font-right rounded-lg flex flex-col items-center">
        <div className="mb-5 text-xl flex flex-row w-[90%] justify-center relative">
          <div className="">
            Search for Friends:
          </div>
          <div className="absolute right-0 rounded-lg ease-in-out duration-300 hover:bg-white hover:text-black cursor-pointer px-2" onClick={() => { setOpenAddFriends(false); }}>
            x
          </div>
        </div>
        <input autoComplete="off" type="text"
          className="mb-4 w-[70%] rounded-lg text-sm bg-slate-200 bg-opacity-30 text-slate-200 
          shadow font-poppins p-2 outline-none" placeholder="Type any username or email"
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
        <Scroll width="70%">
          <div className="flex flex-col w-[100%] overflow-y-auto">
            {
              isSearching ? <div className="h-[20px] flex justify-center m-5"><Loading /></div> :
                <>
                  {
                    searchTerm.length === 0 ? null :
                      results.length === 0 ? <div className={`display-${results.length === 0 ? 'block' : 'none'} transition-all delay-1000`}>Sorry, No matches found.</div> :
                        results.map((user) => {
                          return (
                            <div key={user.username} className="font-poppins flex w-[98%] flex-row items-center rounded-s-full 
                      bg-blue-700 my-1 bg-opacity-50">
                              <img src={user.profilePic} alt="" className="mr-2 h-[50px] object-cover aspect-square rounded-[100%]" />
                              <div className="text-sm">{user.fullname} <span className="text-white/60">@{user.username}</span></div>
                              <div onClick={() => {handleAddFriend(user.username); }}
                                className="ml-auto cursor-pointer ease-in-out duration-300 h-[100%] w-[35px] aspect-square rounded-full mr-5 hover:text-black hover:bg-slate-200 flex justify-center items-center shadow-md"
                              >
                                <FaUserPlus className="" />
                              </div>
                            </div>
                          )
                        })
                  }
                </>
            }
          </div>
        </Scroll>
      </div>
    </div>
  );
}

export default FindUserModal;