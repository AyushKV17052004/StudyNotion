import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfile, updateImage, updateProfile } from "../../../services/ApiInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaCalendarAlt, FaPhone, FaFileAlt, FaEdit, FaCheck } from "react-icons/fa";

function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    Profession: "",
    DOB: "",
    Gender: "",
    About: "",
    contactNumber: ""
  });

  async function getDetails() {
    try {
      const result = await getProfile();
      if (result.data.success) {
        setUserData(result.data.user);
        setFormData({
          firstName: result.data.user.firstName || "",
          lastName: result.data.user.lastName || "",
          Profession: result.data.user.additionalDetails?.Profession || "Student",
          DOB: result.data.user.additionalDetails?.DOB || "",
          Gender: result.data.user.additionalDetails?.Gender || "Male",
          About: result.data.user.additionalDetails?.About || "",
          contactNumber: result.data.user.additionalDetails?.contactNumber || ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token != null) {
      getDetails();
    }
  }, [token]);

  function changeHandler(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function updatePro(e) {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.data.success) {
        toast.success("Profile Updated Successfully");
        if (result.data.user) {
          setUserData(result.data.user);
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setSaveLoading(false);
    }
  }

  const [imgFile, setFile] = useState(null);

  function imageChangeHandler(e) {
    const originalFile = e.target.files[0];
    if (!originalFile) return;

    const img = new Image();
    img.src = URL.createObjectURL(originalFile);

    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        (img.width - size) / 2,
        (img.height - size) / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );

      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], originalFile.name, {
          type: originalFile.type
        });
        setFile(croppedFile);
      }, originalFile.type);
    };
  }

  async function updateImg() {
    if (!imgFile) return;
    if (loading) return;

    setLoading(true);
    try {
      const result = await updateImage(imgFile);
      if (result.data.success) {
        toast.success("Profile Picture Updated Successfully");
        setFile(null);
        getDetails(); // Refresh details
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Something went wrong while uploading image";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 md:px-10 py-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between items-start gap-y-2 mb-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer text-sm flex items-center gap-x-1"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl font-extrabold text-white mt-1">Edit Profile</h1>
        <p className="text-gray-500 text-sm">Update your public profile details and personal information.</p>
      </motion.div>

      <div className="flex flex-col gap-y-6">
        {/* Profile Picture Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gradient-to-r from-[#030637]/80 to-[#1b154c]/80 rounded-2xl border border-gray-800 backdrop-blur-md shadow-xl gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400 shadow-lg"
              src={imgFile ? URL.createObjectURL(imgFile) : userData.imgURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=studynotion"}
              alt="Avatar"
            />
            <div>
              <h3 className="text-white text-lg font-bold">Change Profile Picture</h3>
              <p className="text-gray-400 text-xs mt-1">Recommended square aspect ratio, JPEG or PNG.</p>
            </div>
          </div>
          
          <div className="flex gap-x-3">
            <input
              onChange={imageChangeHandler}
              type="file"
              accept="image/*"
              name="File"
              id="File"
              hidden
            />
            {imgFile === null ? (
              <label
                className="bg-gray-800 border border-gray-700 hover:border-yellow-400 text-white rounded-xl px-4 py-2 text-sm cursor-pointer transition-all duration-300 font-semibold hover:scale-95 flex items-center gap-x-2"
                htmlFor="File"
              >
                <FaEdit size={14} /> Choose Image
              </label>
            ) : (
              <button
                onClick={updateImg}
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl px-4 py-2 text-sm cursor-pointer transition-all duration-300 font-bold hover:scale-95 flex items-center gap-x-2 disabled:opacity-50"
              >
                {loading ? "Saving..." : <><FaCheck size={14} /> Save Picture</>}
              </button>
            )}
          </div>
        </motion.div>

        {/* Profile Details Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/60 rounded-2xl border border-gray-800 p-6 md:p-8 backdrop-blur-md shadow-xl"
        >
          <form onSubmit={updatePro} className="flex flex-col gap-y-6">
            <h3 className="text-white text-xl font-bold border-b border-gray-800 pb-3 flex items-center gap-x-2">
              <FaUser className="text-yellow-400" size={18} /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="text-xs font-semibold text-gray-400" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={changeHandler}
                  className="w-full mt-1.5 px-3 py-2 bg-gray-800/80 rounded-xl text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none transition-all duration-200"
                  placeholder="Enter First Name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="text-xs font-semibold text-gray-400" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={changeHandler}
                  className="w-full mt-1.5 px-3 py-2 bg-gray-800/80 rounded-xl text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none transition-all duration-200"
                  placeholder="Enter Last Name"
                />
              </div>

              {/* Profession */}
              <div>
                <label className="text-xs font-semibold text-gray-400" htmlFor="Profession">Profession</label>
                <div className="relative mt-1.5">
                  <select
                    id="Profession"
                    name="Profession"
                    value={formData.Profession}
                    onChange={changeHandler}
                    className="w-full px-3 py-2 bg-gray-800/80 rounded-xl text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="Student">Student</option>
                    <option value="Developer">Developer</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Designer">Designer</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">&#9662;</span>
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="text-xs font-semibold text-gray-400" htmlFor="DOB">Date of Birth</label>
                <input
                  id="DOB"
                  name="DOB"
                  type="date"
                  value={formData.DOB}
                  onChange={changeHandler}
                  className="w-full mt-1.5 px-3 py-2 bg-gray-800/80 rounded-xl text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none transition-all duration-200 cursor-pointer"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="text-xs font-semibold text-gray-400" htmlFor="contactNumber">Contact Number</label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={changeHandler}
                  className="w-full mt-1.5 px-3 py-2 bg-gray-800/80 rounded-xl text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none transition-all duration-200"
                  placeholder="Enter Contact Number"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-xs font-semibold text-gray-400">Gender</label>
                <div className="flex gap-x-6 mt-3.5">
                  <label className="flex items-center gap-x-2 text-white text-sm cursor-pointer font-medium hover:text-yellow-400 transition-colors duration-200">
                    <input
                      type="radio"
                      name="Gender"
                      value="Male"
                      checked={formData.Gender === "Male"}
                      onChange={changeHandler}
                      className="accent-yellow-400 h-4 w-4"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-x-2 text-white text-sm cursor-pointer font-medium hover:text-yellow-400 transition-colors duration-200">
                    <input
                      type="radio"
                      name="Gender"
                      value="Female"
                      checked={formData.Gender === "Female"}
                      onChange={changeHandler}
                      className="accent-yellow-400 h-4 w-4"
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-x-2 text-white text-sm cursor-pointer font-medium hover:text-yellow-400 transition-colors duration-200">
                    <input
                      type="radio"
                      name="Gender"
                      value="Others"
                      checked={formData.Gender === "Others"}
                      onChange={changeHandler}
                      className="accent-yellow-400 h-4 w-4"
                    />
                    Others
                  </label>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="mt-2">
              <label className="text-xs font-semibold text-gray-400" htmlFor="About">About</label>
              <textarea
                id="About"
                name="About"
                rows={4}
                value={formData.About}
                onChange={changeHandler}
                className="w-full mt-1.5 px-3 py-2 bg-gray-800/80 rounded-xl text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none transition-all duration-200 resize-none"
                placeholder="Share a short bio or something about yourself..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={saveLoading}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-x-2 shadow-lg shadow-yellow-400/10"
              >
                {saveLoading ? "Saving Changes..." : "Save Profile Details"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default EditProfile;