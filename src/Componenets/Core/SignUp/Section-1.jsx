import signup from "../../../assets/login.webp"
import Frame from "../../../assets/frame.png"
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../Redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/ApiInstance";
import { setAccount, setID } from "../../../Redux/slices/AccountType";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Section1(){

    const token = useSelector((state)=> (state.auth.token))
    const dispatch  = useDispatch()
    const navigate = useNavigate();
    const accountType = useSelector((state) => (state.account.accountType))
    const [Data , setData] = useState({email:"" , Password:""});
    const [loading , setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
      function changeHandler(event){
    const{name , value , type, checked } = event.target;
    setData(prev=>{
      return{
        ...prev,
        [name]: type==="checkbox"?checked:value
      }
    })
  }

async function submitHandler(event){
  event.preventDefault()
    if(loading)
        return
    setLoading(true)
    try{
     const result = await login(Data);
     console.log(result.data)
     if(result.data.success){
         dispatch(setToken(result.data.token))
           dispatch(setAccount(result.data.findUser.accountType));
           
          dispatch(setID(result.data.findUser._id)) 
          
  const role = result.data.findUser.accountType;

navigate(
  `${role === "Student"
    ? "/Student/Home/Dashboard/MyProfile"
    : "/Instructor/Home/Dashboard/MyProfile" }`
);


            toast.success(result.data.message)
     }
     else if(result.data.success == false){
        toast.error(result.data.message)
     }
     
    }
    catch(error){
        console.log(error);


  const errorMessage =
    error?.response?.data?.message || "Something went wrong";

  toast.error(errorMessage);
    }
    setLoading(false)


}


    return(
        <div className="w-full py-40 bg-[rgb(3,1,29)]">

           <div className="flex lg:flex-row flex-col-reverse gap-y-10 w-10/12 gap-x-5 mx-auto justify-between items-center">
        
        <div className="lg:w-[500px] w-10/12 flex flex-col justify-evenly items-start gap-y-3">

        <div className="flex flex-col justify-evenly  gap-y-2">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white text-lg ">Build skills for today, tomorrow and beyond <span className="text-blue-500 italic">Education to future-proof your career</span></p>
        </div>
 
        <form onSubmit={submitHandler} className="w-full">
           
           <div>    
          <label className="text-white" htmlFor="email">Email Address <span className="text-red-600">*</span></label> 
          <br />
          <input onChange={changeHandler} className="w-full  border-b border-gray-400 px-2 py-2 rounded-md text-gray-400 text-md bg-gray-800 " type="email" required name="email" placeholder="Enter Email Address"  value={Data.email}  id="email"></input>
           </div>

           <br />


          <div className="w-full flex flex-col">
            <div>
            <label className="text-white" htmlFor="Password">Password <span className="text-red-600">*</span></label> 
            <br />
            <div className="relative">
              <input 
                onChange={changeHandler}  
                className="w-full border-b border-gray-400 pl-2 pr-10 py-2 rounded-md text-gray-400 text-md bg-gray-800 focus:outline-none" 
                type={showPassword ? "text" : "password"} 
                required 
                name="Password" 
                placeholder="Enter Password" 
                value={Data.Password}  
                id="Password"
              />
              <span 
                onClick={() => setShowPassword((prev) => !prev)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
            <br />
            </div>
            <h1 onClick={() =>{
              navigate("/reset-password")
            }} className="cursor-pointer hover:brightness-105 text-xs self-end text-blue-500">Forgot Password</h1>    
           </div>
         <br />
         
         <button type="submit"  className={` w-full px-3 py-2 text-lg font-bold text-black bg-yellow-300 rounded-md cursor-pointer hover:scale-90 transition duration-500 ${loading===true?"cursor-not-allowed":""} `}>Sign in</button> 



        </form>
        </div>

        <div className="lg:w-[400px] w-10/12 relative">
            <img className="object-contain lg:absolute lg:bottom-5 lg:right-5 " src={signup} alt="Sign Up Image" />
            <img className="object-contain lg:block hidden " src={Frame} alt="Frame Image"/>

        </div>


     </div>

        </div>
    )

}

export default Section1;