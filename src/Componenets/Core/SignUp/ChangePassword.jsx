import TopBar from "../Home/TopBar"
import NavBar from "../Home/NavBar"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { ChangePassword } from "../../../services/ApiInstance"
import { FaEye, FaEyeSlash } from "react-icons/fa"

function changePass (){
    const [loading , setLoading] = useState(false);
    const [Data , setData] = useState({newPassword:"" , confirmPassword:""})
    const {token} = useParams()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     function changeHandler(event){
    const{name , value , type, checked } = event.target;
    setData(prev=>{
      return{
        ...prev,
        [name]: type==="checkbox"?checked:value
      }
    })
  }
   const navigate = useNavigate()
  async function PasswordChanger(event) {
    event.preventDefault();

    if(loading){
        return
    }
    if(!token){
        toast.error("User is not registered")
        return
    }
    setLoading(true)
    const DATA = {
        newPassword: Data.newPassword,
        confirmPassword: Data.confirmPassword,
        token: token
    } 
    try{
       const result =  await ChangePassword(DATA);
      
       if(result.data.success){
        toast.success(result.data.message)
        navigate("/Login")
       }


    }
    catch(error){
         console.log(error)
            const errorMessage =
                    error?.response?.data?.message || "Something went wrong";
                
                  toast.error(errorMessage);
    }
    setLoading(false)
    
  }


    return(
 
             <div className="w-full bg-[rgb(3,1,29)] min-h-screen">
            <div className={`w-full flex justify-center items-center  `}>
            <NavBar></NavBar>
         </div>
        <TopBar></TopBar> 
         
         <div className="md:w-[500px] w-10/12 flex flex-col justify-center items-center gap-y-2 pt-30 mx-auto">
            <h1 className="text-white text-2xl font-bold ">Choose New Password</h1>
            <p className="text-gray-600 text-md text-center">Almost done. Enter your new password and youre all set.</p>

           <div className="w-full" >
                    <label className="text-white" htmlFor="newPassword">Password <span className="text-red-500">*</span></label>
                    <br />
                    <div className="relative">
                      <input  
                        onChange={changeHandler} 
                        className="w-full border-b border-gray-400 pl-2 pr-10 py-2 rounded-md text-gray-400 text-md bg-gray-800 focus:outline-none" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        name="newPassword" 
                        value={Data.newPassword}  
                        placeholder="Enter New Password"   
                        id="newPassword"
                      />
                      <span 
                        onClick={() => setShowPassword((prev) => !prev)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </span>
                    </div>
                    </div>
                     <br />
                    <div className=" w-full">
                    <label className="text-white" htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></label>
                    <br />
                    <div className="relative">
                      <input  
                        onChange={changeHandler} 
                        className="w-full border-b border-gray-400 pl-2 pr-10 py-2 rounded-md text-gray-400 text-md bg-gray-800 focus:outline-none" 
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        name="confirmPassword" 
                        value={Data.confirmPassword}  
                        placeholder="Confirm Password"   
                        id="confirmPassword"
                      />
                      <span 
                        onClick={() => setShowConfirmPassword((prev) => !prev)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </span>
                    </div>
                    </div>
                   <br />
                    <button onClick={PasswordChanger} className= {`w-full rounded-md text-center bg-yellow-400 text-md text-black cursor-pointer hover:scale-105 py-1 ${loading===true?"cursor-not-allowed":""} `}>{`${loading ===true?'Changing Passsword...':'Reset Password'} `}</button>
                    <h1  onClick={() => {
                navigate("/Login")
            }} className="text-white text-md text-left cursor-pointer hover:brightness-90" >{`<---`} Back to Login</h1>
         </div>

        </div>

    )
}

export default changePass