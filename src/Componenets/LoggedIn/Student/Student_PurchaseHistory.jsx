import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolled } from "../../../services/ApiInstance";
import AnimatedSection from "../../Common/AnimatedSection";

function Student_PurchaseHistory() {
  const [courses, setCourses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const accountType = useSelector((state) => state.account.accountType);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const result = await getEnrolled();
        if (result.data.success) {
          setCourses(result.data.Student.Courses || []);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (token && accountType === "Student") {
      fetchPurchases();
    }
  }, [token, accountType]);

  return (
    <div className="flex flex-col w-full px-9 mx-auto pb-10">
      <AnimatedSection>
        <p className="text-gray-600 text-sm">
          Home / Dashboard / <span className="text-yellow-400">Purchase History</span>
        </p>
        <h1 className="text-white text-xl font-bold mt-2">Purchase History</h1>
        <p className="text-gray-500 text-sm mt-1">
          All courses you have enrolled in on StudyNotion.
        </p>
      </AnimatedSection>

      {courses.length === 0 ? (
        <AnimatedSection delay={0.1}>
          <div className="mt-10 text-center text-gray-400">
            <p className="text-lg font-bold text-white">No purchases yet</p>
            <p className="text-sm mt-2">Browse the catalogue and add courses to your wishlist.</p>
          </div>
        </AnimatedSection>
      ) : (
        <div className="mt-6 flex flex-col gap-y-4">
          {courses.map((course, index) => (
            <AnimatedSection key={course._id} delay={index * 0.08}>
              <div className="flex flex-col md:flex-row gap-4 bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-yellow-400/30 transition duration-300">
                <img
                  className="w-full md:w-[180px] h-[100px] object-cover rounded-md"
                  src={course.thumbnailUrl}
                  alt={course.courseName}
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-white font-bold">{course.courseName}</h2>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {course.courseDescription}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-yellow-400 font-bold">Rs. {course.price}</span>
                    <span className="text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full">
                      Enrolled
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}

export default Student_PurchaseHistory;
