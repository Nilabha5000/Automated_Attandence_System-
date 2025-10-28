const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const studentRoutes = require("./routers/studentRoutes");
const adminRoutes = require("./routers/adminRoutes");
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

app.use(express.json({ limit: "70mb" }));
app.use(express.urlencoded({ limit: "70mb", extended: true }));

app.use("/api",studentRoutes);
app.use("/api",adminRoutes);

app.listen(4000,()=>{
    console.log("App is running ....");
});