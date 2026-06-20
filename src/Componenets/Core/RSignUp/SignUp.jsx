import SIGN from "../../../assets/signup.webp"
import Frame from "../../../assets/frame.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendOtp } from "../../../services/ApiInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp(){

const [accountType , setAccount] = useState("Student");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [Data , setData] = useState({firstName:"" , lastName:"" , email:"" , Password:"" , confirmPassword:"" , accountType:"Student"})
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

function accountHandler(type) {
  setAccount(type);
  setData(prev => ({
    ...prev,
    accountType: type,
  }));
}
 

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
    event.preventDefault();
    if(loading)
        return

   setLoading(true);
    try{
      if(Data.Password !== Data.confirmPassword){
        toast.error("Passwords Do not match")
        setLoading(false)
        return
      }
     const EmailData = {
        email: Data.email
      }
      toast.success("Wait till Verifying Details")
  
    const result = await sendOtp(EmailData);
    console.log(result.data);
    if(result.data.success  == true){
   
      toast.success(result.data.message || "OTP Sent Successfully")
     navigate("/send-otp" , 
        {state: {
            signupData: Data,
        }

        }
     )
    console.log("Sending Object");
    }
    else{
        toast.error(result.data.message)
    }
    
  } catch (error) {
    console.error("Error sending data:", error);
     const errorMessage =
        error?.response?.data?.message || "Something went wrong";
    
      toast.error(errorMessage);
  }
  setLoading(false)
  }


    return (
        <div className="w-full py-40 bg-[rgb(3,1,29)]">
            <div className="flex lg:flex-row flex-col-reverse gap-y-10 w-10/12 gap-x-5 mx-auto justify-between items-center">

               <div className="lg:w-[500px] w-10/12 flex flex-col justify-evenly items-start gap-y-3">
                <h1 className="text-2xl font-bold text-white">Join the millions learning to code with <span className="text-blue-500">Study Notion</span> for free</h1>
                <p className="text-md text-white">Build skills for today, tomorrow and beyond <span className="text-blue-500 italic">Education to future-proof your career</span></p>


                 <form onSubmit={submitHandler} className="w-full">


                 <div className="bg-gray-800 rounded-4xl px-2 py-1 w-fit flex flex-row">
                    <h1 onClick={()=>accountHandler("Student")} className={`text-white px-3 cursor-pointer py-1 rounded-4xl ${accountType==='Student'?"bg-gray-950":""} `}>Student</h1>
                    <h1 onClick={()=>accountHandler("Instructor")} className={`text-white px-3 cursor-pointer py-1 rounded-4xl ${accountType==='Student'?"":"bg-gray-950"} `}>Instructor</h1>
                 </div>
                  
                  <br />

                 <div className="w-full  flex lg:flex-row flex-col justify-between items-center gap-x-3">
                    <div className="lg:w-1/2 w-full">
                   <label className="text-white" htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
                   <br />
                   <input onChange={changeHandler}  className="w-full border-b border-gray-400 px-2 py-2 rounded-md text-gray-400 text-md bg-gray-800 " type="text" required name="firstName"  placeholder="Enter First Name"  value={Data.firstName}  id="firstName"></input>
                   </div>
                  <br />
                   <div className="lg:w-1/2 w-full">
                    <label className="text-white" htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
                   <br />
                   <input  onChange={changeHandler} className="w-full border-b border-gray-400 px-2 py-2 rounded-md text-gray-400 text-md bg-gray-800 " type="text" required name="lastName" value={Data.lastName}  placeholder="Enter last Name"   id="lastName"></input>
                   </div>

                 </div>
                 <br />
                 
                 <div className="w-full">                
                <label className="text-lg text-white" htmlFor="email"> Email <span className="text-red-500">*</span></label>
                <br />
                <input onChange={changeHandler}  className="w-full  border-b border-gray-400 px-2 py-2 rounded-md text-gray-400 text-md bg-gray-800 " type="email" required name="email" value={Data.email} placeholder="Enter Email Address"   id="email"></input>
                </div>

                <br />
                
                <div className="w-full  flex lg:flex-row flex-col justify-between gap-x-3 items-center">
                    <div className="lg:w-1/2 w-full" >
                    <label className="text-white" htmlFor="Password">Password <span className="text-red-500">*</span></label>
                    <br />
                    <div className="relative">
                      <input  
                        onChange={changeHandler} 
                        className="w-full border-b border-gray-400 pl-2 pr-10 py-2 rounded-md text-gray-400 text-md bg-gray-800 focus:outline-none" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        name="Password" 
                        value={Data.Password}  
                        placeholder="Create Password"   
                        id="Password"
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
                    <div className="lg:w-1/2 w-full">
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

                 </div>
                 <br />

                  <button   className={`${loading===true?"cursor-not-allowed":""} w-full px-3 py-2 text-lg font-bold text-black bg-yellow-300 rounded-md cursor-pointer hover:scale-90 transition duration-500`}>{`${loading===true?'Sending OTP...':'Sign up'} `}</button> 

                 </form>

               </div>

                <div className="lg:w-[400px] w-10/12 relative">
                            <img className="object-contain lg:absolute lg:bottom-5 lg:right-5 " src={SIGN} alt="Sign Up Image" />
                            <img className="object-contain lg:block hidden " src={Frame} alt="Frame Image"/>
                
                        </div>

            </div>
        </div>
    )
}

export default SignUp