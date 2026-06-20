import ReactStars from "react-stars";
import AnimatedSection from "./AnimatedSection";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { deleteRating } from "../../services/ApiInstance";
import { toast } from "react-toastify";
import { useState } from "react";

function ReviewCard({ review, index = 0, compact = false, onDeleteSuccess }) {
  const user = review?.user;
  const course = review?.Course;
  const currentUserID = useSelector((state) => state.account.userID);
  const [deleting, setDeleting] = useState(false);

  const isOwner = user?._id?.toString() === currentUserID?.toString();

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete your review?");
    if (!confirmed) return;

    setDeleting(true);
    try {
      const result = await deleteRating(review._id);
      if (result.data.success) {
        toast.success("Review deleted successfully");
        if (onDeleteSuccess) {
          onDeleteSuccess(review._id);
        }
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AnimatedSection delay={index * 0.1}>
      <div
        className={`bg-gray-900 border border-gray-700 rounded-xl p-5 flex flex-col gap-y-3 hover:border-yellow-400/40 transition duration-300 relative ${
          compact ? "max-w-sm" : "max-w-md"
        }`}
      >
        <div className="flex items-center gap-x-3 pr-8">
          <img
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
            src={user?.imgURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=studynotion"}
            alt={`${user?.firstName || "User"} avatar`}
          />
          <div>
            <h3 className="text-white text-sm font-bold">
              {user?.firstName} {user?.lastName}
            </h3>
            {course?.courseName && (
              <p className="text-gray-500 text-xs">{course.courseName}</p>
            )}
          </div>
        </div>
        <ReactStars
          count={5}
          value={review?.rating || 0}
          size={18}
          edit={false}
          isHalf={true}
          activeColor="#facc15"
        />
        <p className="text-gray-400 text-sm leading-relaxed">{review?.review}</p>
        
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="absolute right-4 top-4 text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-gray-800 transition duration-200 cursor-pointer disabled:opacity-50"
            title="Delete Review"
          >
            <FaTrash size={14} />
          </button>
        )}
      </div>
    </AnimatedSection>
  );
}

export default ReviewCard;
