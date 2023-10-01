
import React, { useEffect, useState } from 'react';
import { useNavigate }  from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../api/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loading from './Loading';

const Login = () => {

    const [loginPage, setLoginPage] = useState(true);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [login, { isLoading: isLoading1}] = useLoginMutation();
    const [register, {isLoading: isLoading2 }] = useRegisterMutation();
    let isLoading = isLoading1 || isLoading2;

    const {userinfo} = useSelector((state) => state.auth);
  
    useEffect(() => {
      if(userinfo) navigate('/chat');
    }, [navigate, userinfo]);
  
    const validateDetails = async (e) => {
      e.preventDefault();
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(loginPage) {
        
        if(password.length < 8) {
          toast('Enter a password greater than 8 characters.');
        } 
        else {
          // Valid Details
          await loginUser();
          return;
        }
  
      } else {
  
        if(!email.match(validRegex)) {
          toast('Enter a valid e-mail.');
        } 
        else if(password.length < 8) {
          toast('Choose a password greater than 8 characters.');
        } 
        else if(fullname.length === 0) {
          toast('Enter your valid Full Name.');
        } 
        
        else {
          // Valid Details
          await registerUser();
          return;
        }
  
      }
    }
  
    const loginUser = async () => {
  
      try {
        const res = await login({ id: email, password }).unwrap();
        if(res.message) if(process.env.NODE_ENV === 'development') toast(res.message);

        dispatch(setCredentials(res.data.user));
        navigate('/chat');
      } catch (err) {
        toast(err?.data?.message || err);
      }
  
    }
  
    const registerUser = async () => {
      try {
        const res = await register({ email, password, fullname }).unwrap();
        if(res.message) if(process.env.NODE_ENV === 'development') toast(res.message);
        dispatch(setCredentials(res.data.user));
        navigate('/chat');
      } catch (err) {
        toast(err?.data?.message || err);
      }
    }
  


    return (

        <form className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]  bg-white  p-5 rounded-lg min-w-[35vw]'>
        <div className='text-3xl font-right text-gray-900 text-center mt-5 mb-10'>
          { loginPage ? 'Login': 'Sign Up' } {/*for <span className='text-red-700'>OP CHATAPP</span>*/}
        </div>
        <div className='my-3 flex flex-row justify-center'>
          <input  
            type="text"
            autoComplete='username' 
            placeholder={loginPage ? "Username / Email" : "Email" } 
            value={email} className='placeholder-slate-700 opacity-60 bg-slate-300  font-poppins p-2 px-3 rounded-lg' 
            onChange={(e) => { setEmail(e.target.value); }}
          />
        </div>
        
        {!loginPage && <div className='my-3 flex flex-row justify-center'>
          <input type="text" placeholder="Full Name" value={fullname} className='placeholder-slate-700 opacity-60 bg-slate-300 font-poppins p-2 px-3 rounded-lg' 
            onChange={(e) => { setFullname(e.target.value); }}
          />
        </div>}   

        <div className='my-3 flex flex-row justify-center'>
          <input type="password" autoComplete='current-password' placeholder="Password" value={password} className='placeholder-slate-700 opacity-60 bg-slate-300 font-poppins p-2 px-3 rounded-lg' 
            onChange={(e) => { setPassword(e.target.value); }}
          />
        </div>        

        <div className='mt-7 font-poppins text-center'>
          {
            loginPage ? 
            <div>
              Create an account instead. <span className='text-blue-500 cursor-pointer underline' onClick={() => { setLoginPage(!loginPage) }} >Sign Up Now!</span>
            </div> :

            <div>
              Already have an account? <span className='text-blue-500 cursor-pointer underline' onClick={() => { setLoginPage(!loginPage) }} >Login Instead!</span>
            </div>
            
          }
        </div>

        <div className='flex flex-row justify-center my-5'>
          <button disabled={isLoading} type='submit' className='hover:bg-blue-700 bg-blue-400 p-2 px-4 rounded-lg text-white'
            onClick={(e) => { validateDetails(e); }}
          >
            { isLoading ? <Loading/> : loginPage ? 'Login' : 'Sign Up' }
          </button>
        </div>
      </form>
    );
}

export default Login;