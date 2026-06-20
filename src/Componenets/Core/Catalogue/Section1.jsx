import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getAllCategories, getCategoryDetails } from "../../../services/ApiInstance";
import Card from "./CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import "./Scrollbar.css"

function Section (){
    const {category} = useParams();
    const [idx , setIndex] = useState(1)  
    const [currentCategory , setCategory] = useState({})
    const [categoryCourses , setCategoryCourses] = useState([])
    const [otherCategories, setOtherCategories] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchCategoryPageData() {
        setLoading(true);
        try {
            const categoriesRes = await getAllCategories();
            if (categoriesRes.data.success) {
                const matched = categoriesRes.data.response.filter((cat) => cat.name === category )[0];
                if (matched) {
                    setCategory(matched);
                    const detailsRes = await getCategoryDetails({ categoryId: matched._id });
                    if (detailsRes.data.success) {
                        setCategoryCourses(detailsRes.data.SameCategory?.course || []);
                        setOtherCategories(detailsRes.data.diffCategory || []);
                    }
                }
            }
        }
        catch(error){
           console.log("Error fetching category details:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCategoryPageData()
    } , [category])

    // Filter courses based on selected tab
    const getFilteredCourses = () => {
        if (!categoryCourses) return [];
        const courses = [...categoryCourses];
        if (idx === 1) {
            return courses;
        } else if (idx === 2) {
            return courses.slice().reverse();
        } else if (idx === 3) {
            // Mock trending sorting
            return courses.filter((c, i) => i % 2 === 0);
        }
        return courses;
    };

    const filtered = getFilteredCourses();

    // Get recommended courses from other categories
    const getRecommendations = () => {
        const recs = [];
        otherCategories.forEach(cat => {
            if (cat.course && cat.course.length > 0) {
                recs.push(...cat.course.slice(0, 2));
            }
        });
        // Filter out any duplicates
        const uniqueRecs = [];
        const seen = new Set();
        recs.forEach(course => {
            if (!seen.has(course._id)) {
                seen.add(course._id);
                uniqueRecs.push(course);
            }
        });
        return uniqueRecs.slice(0, 4); // return max 4 recommendations
    };

    const recommendedCourses = getRecommendations();

    return (
        <div className="w-full pt-16 bg-[#03011d] min-h-screen text-slate-100">
            {/* Header / Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 py-12 border-b border-slate-805/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_55%)]" />
                <div className="w-10/12 mx-auto flex md:flex-row flex-col gap-8 justify-between items-start relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-y-3 max-w-2xl"
                    >
                        <nav className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                            Home / Catalogue / <span className="text-yellow-400 font-bold">{category}</span>
                        </nav>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
                            {category}
                        </h1>
                        <p className="text-slate-300 text-sm leading-relaxed mt-2 max-w-xl">
                            {currentCategory.description || "Explore structured pathways, tools, and courses to jumpstart or advance your skills in this category."}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-1 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {categoryCourses.length} Courses available
                            </span>
                            <span className="flex items-center gap-1 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
                                🎓 Professional Instructors
                            </span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-slate-900/80 backdrop-blur-md p-5 rounded-xl border border-slate-800 w-full md:max-w-[280px]"
                    >
                        <h3 className="text-sm font-bold text-white mb-3">Related Resources</h3>
                        <ul className="text-xs text-slate-400 space-y-2.5">
                            <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-300 transition-colors duration-200">
                                <span className="text-indigo-500">•</span> Cheatsheets & Guides
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-300 transition-colors duration-200">
                                <span className="text-indigo-500">•</span> Interactive Coding Projects
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-300 transition-colors duration-200">
                                <span className="text-indigo-500">•</span> StudyNotion Forums
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-300 transition-colors duration-200">
                                <span className="text-indigo-500">•</span> Articles & Tech Blogs
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Courses section */}
            <div className="py-12 w-full bg-[#03011d]">
                <div className="w-10/12 mx-auto">
                    <h2 className="text-2xl font-extrabold text-white text-left tracking-tight mb-2">
                        Courses to get you started
                    </h2>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-slate-800/80 py-1 gap-x-6 items-center">
                        {[
                            { id: 1, label: "Most Popular" },
                            { id: 2, label: "Newest" },
                            { id: 3, label: "Trending" }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setIndex(tab.id)}
                                className={`text-sm tracking-wide py-2 relative font-medium transition-all duration-300 cursor-pointer ${
                                    idx === tab.id ? "text-yellow-400 font-bold" : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                {tab.label}
                                {idx === tab.id && (
                                    <motion.div 
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-400"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Course List Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-slate-400">Loading courses...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/30 rounded-xl border border-dashed border-slate-800 mt-6">
                            <h3 className="text-lg font-bold text-white">No Courses Available</h3>
                            <p className="text-sm text-slate-400 mt-1">There are no courses matching this category selection right now.</p>
                        </div>
                    ) : (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filtered.map((course) => (
                                    <motion.div
                                        layout
                                        key={course._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card course={course} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Top Courses in Category */}
                    {!loading && categoryCourses.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-800/40">
                            <h2 className="text-2xl font-extrabold text-white text-left tracking-tight mb-6">
                                Top Courses in {category}
                            </h2>
                            <div className="flex overflow-x-auto pb-4 gap-6 snap-x custom-scrollbar">
                                {categoryCourses.map((course) => (
                                    <div key={`top-${course._id}`} className="snap-start">
                                        <Card course={course} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Frequently Bought Together / Recommendations */}
                    {!loading && recommendedCourses.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-slate-800/40">
                            <h2 className="text-2xl font-extrabold text-white text-left tracking-tight mb-6">
                                Recommended courses in other categories
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {recommendedCourses.map((course) => (
                                    <Card key={`rec-${course._id}`} course={course} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Section