const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173", // Change to your Vue.js frontend port
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};
app.use(cors(corsOptions));

mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("db connected"))
.catch(err => console.log("error to connect" + err));

//creating all the required schemas and models

//schema and model for student
const StudentSchema = new mongoose.Schema({
    collageID : {type : String, reqired : true, unique : true},
    name: { type: String, required: true },
    password : {type : String, required : true},
    daysPresent: { type: Number, default: 0 },
    lastAttendance: { type: Date }
});
const Student = mongoose.model("Student",StudentSchema);

//schema and model for Admin
const AdminSchema = new mongoose.Schema({
    adminID :  {type : String, reqired : true, unique : true},
    name :{type : String, required : true},
    password : {type : String , required : true}
});
const Admin = mongoose.model("Admin", AdminSchema);

// schema and for model for SemesterConfig
const SemesterConfigSchema = new mongoose.Schema({
    _id: { type: String, default: "semesterConfig" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalWorkingDays: { type: Number, required: true }
});
const SemesterConfig = mongoose.model("SemesterConfig", SemesterConfigSchema);
//all these handels all the requests and give responses
app.get("/api/all-students" ,async(req,res)=>{
    try{
        const students = await Student.find();

        return res.status(200).json({message : "success", data:students});
    }
    catch(err){
        return res.status(502).json({meaasge : "Error  "});
    }  

});
app.post("/api/addstudent",async (req,res)=>{
        const {collageID,name,password} = req.body;
        if (!collageID || !name || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
    
        try{
            const student = new Student({collageID,name,password});

            await student.save();
            return res.status(201).json({ message: "Student added successfully" });
        }
        catch(err){
            console.log(err);
           return  res.status(500).json({ message: "Failed to add this details" });
        }
        
         
});

app.post("/api/addadmin",async (req,res)=>{
   // const {adminID,name,password} = req.body;
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
    
     
});
app.post("/api/signin",async(req,res)=>{
      
      console.log(req.body);
      const{CollageID,password} = req.body;
      
      try{
        const student = await Student.findOne({collageID : req.body.collageID});

        if(!student){
            return  res.status(404).json({message : "Student not found"});
        }
        if(student.password !== password)
            return res.status(401).json({message : "invalid password"})
        
        return res.status(200).json({ message: "Sign-in successful" , student : {
             collageID : student.collageID,
             name : student.name,
             days : student.daysPresent
        }});
      }
      catch(error){
           return res.status(502).json({meaasge : "Error  "});
      }
    
});
app.listen(4000,()=>{
    console.log("App is running ....");
});