const express = require("express");
const router = express.Router();

const { auth, isInstructor, isStudent } = require("../middleware/auth");

const {contactMail} = require("../controllers/Contact")

// Course Controllers
const {
  createCourse,
  getAllCourses,
  getCourse,
  getInstructorCourses,
  deleteCourse,
  publishCourse,
  PurchaseCourse,
  getEnrolledCourses,
  completeCourse,
  markVideoComplete,
  updateCourse
} = require("../controllers/Course");

// Section Controllers
const {
  createSection,
  updateSection,
  deleteSection,
  getAllSections
} = require("../controllers/Section");

// SubSection Controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
  getAllSubsections,
  getSubsection
} = require("../controllers/SubSection");
const { route } = require("./User");


// ================= COURSE =================

// Create course (Step 1: Course Information)
router.post(
  "/course/create",
  auth,
  isInstructor,
  createCourse
);

// Get all courses (Public / Catalog)
router.get(
  "/course/all",
  getAllCourses
);

// Get single course details
router.post(
  "/course/details",
  getCourse
);
router.get(
  "/course/details/createdByInstructor",
  auth,
  isInstructor,
  getInstructorCourses
)

router.delete(
  "/course/delete",
  auth,
  isInstructor,
  deleteCourse
)

router.put(
  "/course/publish",
  auth,
  isInstructor,
  publishCourse
)

router.put(
  "/course/purchase",
  auth,
  isStudent,
  PurchaseCourse
)

router.get(
  "/course/Enrolled",
  auth ,
  isStudent,
  getEnrolledCourses
)

router.put(
  "/course/complete",
  auth,
  isStudent,
  completeCourse
)

router.put(
  "/course/progress",
  auth,
  isStudent,
  markVideoComplete
)

router.put(
  "/course/update",
  auth,
  isInstructor,
  updateCourse
)

// ================= SECTION =================

// Create section (Step 2: Course Builder)
router.post(
  "/section/create",
  auth,
  isInstructor,
  createSection
);

// Update section title/order
router.put(
  "/section/update",
  auth,
  isInstructor,
  updateSection
);

// Delete section
router.delete(
  "/section/delete",
  auth,
  isInstructor,
  deleteSection
);

router.post(
  "/section/getAll",
  auth,
  
  getAllSections
);



// ================= SUBSECTION (LECTURE) =================

// Add lecture/video
router.post(
  "/subsection/create",
  auth,
  isInstructor,
  createSubSection
);

// Update lecture
router.put(
  "/subsection/update",
  auth,
  isInstructor,
  updateSubSection
);

// Delete lecture
router.delete(
  "/subsection/delete",
  auth,
  isInstructor,
  deleteSubSection
);

router.post(
  "/subsection/getAll",
  auth,
  isInstructor,
  getAllSubsections
)
router.post(
  "/subsection/get",
  auth,
  isStudent,
  getSubsection
)


router.post("/contact" , contactMail)
module.exports = router;
