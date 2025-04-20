import axios from "axios";
const API_URL = "http://localhost:4000/api";
export const addStudent = async(studentData) => {
      try{
        const response = await axios.post(`${API_URL}/addstudent`,studentData);
        return response.data;
      }
      catch(error){
        console.error("Axios Error:", error.message);
        console.error("Axios Response Data:", error.response?.data || "No response received");
        throw error;
      }
      
}

export const addAdmin = async(AdminData) => {
  try{
    const response = await axios.post(`${API_URL}/addadmin`,AdminData);
    return response.data;
  }
  catch(error){
    console.error("Axios Error:", error.message);
    console.error("Axios Response Data:", error.response?.data || "No response received");
    throw error;
  }
  
}
export const checkDetails = async(studentData) =>{
  try{
    const response = await axios.post(`${API_URL}/signin`,studentData, {
      headers: { "Content-Type": "application/json" } // Ensure JSON
  });
    return response.data;
  }
  catch(error){
    console.error("Axios Error:", error.message);
    console.error("Axios Response Data:", error.response?.data || "No response received");
    throw error;
  }
}
export const fetchAllStudents = async()=>{
   try{
        const response = await axios.get(`${API_URL}/all-students`);
        return response.data;
   }
   catch(err){
    console.error("Axios Error:", error.message);
    console.error("Axios Response Data:", error.response?.data || "No response received");
    throw error;
   }
}