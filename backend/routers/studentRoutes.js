const express = require("express");
const router = express.Router();
const { getAllStudents, addStudent, studentSignin , attendanceMark,getListOfPresentDays} = require("../controllers/studentControllers");

router.get("/all-students", getAllStudents);
router.post("/addstudent", addStudent);
router.post("/signin", studentSignin);
router.post("/mark-attendance",attendanceMark);
router.post("/get-all-days",getListOfPresentDays);
module.exports = router;