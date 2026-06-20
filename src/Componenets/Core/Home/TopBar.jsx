
import {  useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import dropdown from "../../../assets/dropdown.png"
import menu from "../../../assets/menu.png"
import { useDispatch, useSelector } from "react-redux";
import { showMenu } from "../../../Redux/slices/NavbarSlice";
import CatalogCard from "../Home/CatalogCard"
import { getAllCourses, getProfile } from "../../../services/ApiInstance";
import { useEffect } from "react";
import { useState } from "react";
import Cart from "../../../assets/Cart.png"
import ProfileCard from "../../LoggedIn/ProfileCard"
function TopBar(){
  const navigate = useNavigate()
 const token = useSelector((state) => (state.auth.token))
 const accountType  = useSelector((state) => (state.account.accountType))
 const AllCourses = useSelector((state) => (state.Cart.Courses))
 const [ProfileMenu , setProfileMenu] = useState(false)
  const [img, setImg] = useState(
    
  );


 async function getImage() {
  try{
    const result = await getProfile();
    if(result.data.success){
      setImg(result.data.user.imgURL)
    }
  }
  catch(error){
    console.log(error)
  }
 }
 useEffect(() =>{
  if(token != null)
  getImage()
 } , [token]);


  function logoHandler(){
    navigate("/")
  }
  const dispatch  = useDispatch()

   function SignHandler(){
      navigate("/Login")
    }
    function SignUpHandler(){
      navigate("/Signup")
    }

    return(
        <div className="w-full fixed z-40 flex flex-col">
          {/* Marvel accent bar – Iron Man red/gold shimmer */}
          <div
            className="w-full h-[3px] relative overflow-hidden"
            style={{ background: "linear-gradient(90deg, #dc2626, #f59e0b, #dc2626, #ef4444, #f59e0b)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                animation: "shimmer-bar 2.5s ease-in-out infinite",
              }}
            />
            <style>{`
              @keyframes shimmer-bar {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
            `}</style>
          </div>
        <div className="border-b border-gray-600/50 bg-[rgb(3,1,29)]/95 backdrop-blur-md flex flex-row items-center justify-around py-2 ">
            <div className="w-[150px]">
              <img onClick={logoHandler} className="object-contain w-[150px] " src={Logo} alt="StudyNotion-Logo" />  
            </div>

           

         

            <div className="  flex flex-row items-center justify-evenly gap-x-3 max-[800px]:hidden">

            <NavLink to={`${token === null?'/':`${accountType === "Student" ?'/Student/Home/Dashboard/MyProfile':'/Instructor/Home/Dashboard/MyProfile'} `}`} className={({ isActive }) =>
            `${
              isActive
                ? "text-yellow-400"
                : "text-white"
            }`
          } >
                <button className="text-md font-bold cursor-pointer hover:brightness-90 " >Home</button>
            </NavLink>

            
              <div className={`flex flex-row  hover:brightness-90 group relative ${accountType==="Instructor"?"hidden":"block"}`}>  <button className="text-white text-md font-bold  cursor-pointer " >Catalogues</button>
                    <img className="object-contain invert relative top-[1.8px] left-[4px] w-[15px] cursor-pointer group-hover:rotate-180 transition duration-200" src={dropdown} alt="" />
                    <div className={`min-h-[150px] invisible z-50 group-hover:visible top-[20px] absolute `}>
                    <CatalogCard></CatalogCard></div>
              </div>


               <NavLink to={`${token === null?'/About':`${accountType === "Student" ?'/Student/About':'/Instructor/About'} `}`} className={({ isActive }) =>
            `${
              isActive
                ? "text-yellow-400"
                : "text-white"
            }`
          } >
                <button className="text-md font-bold cursor-pointer hover:brightness-90 " >About Us</button>
            </NavLink>
            
            <NavLink to={`${token === null?'/Contact':`${accountType === "Student" ?'/Student/Contact':'/Instructor/Contact'} `}`} className={({ isActive }) =>
            `${
              isActive
                ? "text-yellow-400"
                : "text-white"
            }`
          } >
                <button className="text-md font-bold cursor-pointer hover:brightness-90 " >Contact Us</button>
            </NavLink>

           

            </div>
            <div className={`flex flex-row items-center justify-evenly gap-x-2 max-[800px]:hidden ${token?"hidden":""}`}>
                <button onClick={SignUpHandler} className="text-lg text-gray-300 px-2 py-1 border border-gray-500 rounded-md hover:bg-gray-700 cursor-pointer">Sign up</button>
                <button onClick={SignHandler} className="text-lg text-gray-300 px-2 py-1 border border-gray-500 rounded-md hover:bg-gray-700 cursor-pointer">Log in</button>
            </div>
            <div className={`flex gap-x-2 justify-center items-center ${token?"":"hidden"}`}>
            <div onClick={() => {navigate("/Student/Dashboard/Wishlist")}} className={`relative cursor-pointer  `}>
                     <img className="w-[25px] object-contain invert cursor-pointer" src={Cart} alt="" />
                     <div className="w-[15px] h-[15px] bottom-[5px] rounded-full left-[10px] bg-green-400 text-white animate-bounce absolute flex text-[10px] justify-center items-center">{AllCourses.length}</div>
                  </div>
            <div className={`flex flex-row items-center justify-evenly gap-x-2 max-[800px]:hidden group relative `}>
                  
                  <img  onClick={() => {
                    setProfileMenu(!ProfileMenu)
                  }} className="w-[30px] h-[30px] rounded-full cursor-pointer" src={img} alt="" />
                  <div className={` ${ProfileMenu === true?"visible":"invisible"} absolute min-h-[100px]   group-hover:visible top-7`}><ProfileCard></ProfileCard></div>
                  
            </div>
            </div>
             <div className="min-[800px]:hidden  flex gap-x-5 ">
              <div className={`flex flex-row items-center justify-evenly gap-x-2 min-[800px]:hidden  ${token?"":"hidden"}`}>
                
                  <img className="w-[30px] h-[30px] rounded-full" src={img} alt="" />
            </div>
              <img onClick={() => dispatch(showMenu())}  className="w-[30px] object-contain self-end invert " src={menu} alt="" />
            </div>
        </div>
        </div>
    )
}

export default TopBar