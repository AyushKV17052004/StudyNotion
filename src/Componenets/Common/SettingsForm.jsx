import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordLoggedIn, deleteAccount } from "../../services/ApiInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAccount } from "../../Redux/slices/AccountType";
import { removeToken } from "../../Redux/slices/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SettingsForm({ role = "Student" }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleChangePassword(e) {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await changePasswordLoggedIn({ oldPassword, newPassword });
      if (result.data.success) {
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const result = await deleteAccount();
      if (result.data.success) {
        toast.success("Account deleted successfully");
        dispatch(removeToken());
        dispatch(removeAccount());
        navigate("/Login");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    }
  }

  return (
    <div className="flex flex-col gap-y-8 w-full px-9">
      <div>
        <p className="text-gray-600 text-sm">
          Home / Dashboard / <span className="text-yellow-400">Settings</span>
        </p>
        <h1 className="text-white text-xl font-bold mt-2">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your {role.toLowerCase()} account security preferences.
        </p>
      </div>

      <form
        onSubmit={handleChangePassword}
        className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col gap-y-4 max-w-lg"
      >
        <h2 className="text-white font-bold text-lg">Change Password</h2>
        <div>
          <label className="text-xs text-gray-400">Current Password</label>
          <div className="relative mt-1">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 pr-10 py-2 bg-gray-800 rounded-md text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none"
              placeholder="Enter current password"
            />
            <span 
              onClick={() => setShowOldPassword((prev) => !prev)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showOldPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400">New Password</label>
          <div className="relative mt-1">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 pr-10 py-2 bg-gray-800 rounded-md text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none"
              placeholder="Enter new password"
            />
            <span 
              onClick={() => setShowNewPassword((prev) => !prev)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400">Confirm New Password</label>
          <div className="relative mt-1">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 pr-10 py-2 bg-gray-800 rounded-md text-white text-sm border border-gray-700 focus:border-yellow-400 outline-none"
              placeholder="Confirm new password"
            />
            <span 
              onClick={() => setShowConfirmPassword((prev) => !prev)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black font-bold text-sm px-4 py-2 rounded-md w-fit hover:scale-95 transition duration-300 cursor-pointer disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      <div className="bg-gray-900 border border-red-900/50 rounded-xl p-6 max-w-lg">
        <h2 className="text-red-400 font-bold text-lg">Danger Zone</h2>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Permanently delete your account and all associated data.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600/20 border border-red-500 text-red-400 font-bold text-sm px-4 py-2 rounded-md hover:bg-red-600/30 transition duration-300 cursor-pointer"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default SettingsForm;
