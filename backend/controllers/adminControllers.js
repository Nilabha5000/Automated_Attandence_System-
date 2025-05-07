const Admin = require("../models/Admin");
const Attendance = require("../models/studentAttendance");
const addAdmin = async (req,res) =>{
    console.log(req.body);
    if (!req.body.adminID || !req.body.name || !req.body.password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try{
        const admin = new Admin();
        admin.adminID = req.body.adminID;
        admin.name = req.body.name;
        admin.password = req.body.password;


        await admin.save();
        return res.status(201).json({ message: "Admin added successfully" });
    }
    catch(err){
        console.log(err);
       return  res.status(500).json({ message: "Admin to add this details" });
    }
}
const initializeClass = async(req,res) =>{
       try{
           const att = new Attendance();
           att.date = new Date().toISOString().split('T')[0];
           att.students = [];
           await att.save();
           return res.status(201).json({message : "Class stablished succesfully"});
       }
       catch(err){
         console.log(err);
         return  res.status(500).json({ message: "Admin to add this details" });
       }
}
module.exports = {addAdmin,initializeClass};