import './App.css';
import Login from './components/Login';



function App() {

  return (
    <div style={{backgroundImage: `url(https://i.ibb.co/XyQ14x3/login-Background.jpg)`}} className="h-[100vh] bg-cover w-full flex flex-row justify-center items-center">
      <div className='flex flex-row '>
        <div className='flex flex-col pr-24 text-center justify-center font-slab font-extrabold drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]'>
          <span className='text-slate-200 text-6xl pb-8'>WELCOME TO</span>
          <span className="text-[#89CFF0] text-7xl">CHAT REALM</span>
        </div>
        
        <Login></Login>
      </div>
      
    </div>
  );
}


export default App;
