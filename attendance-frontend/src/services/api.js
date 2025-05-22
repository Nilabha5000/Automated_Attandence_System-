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

export const classInit = async() =>{
     try{
        const response = await axios.get(`${API_URL}/initclass`);
     }
     catch(err){
        console.log(err);
        throw err;
     }

}
export const getPresentDays = async(studentData)=>{
      try{
          const response = await axios.post(`${API_URL}/get-all-days`,studentData,{
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
export const markAttendance = async(studentData) =>{
      try{
         const response = axios.post(`${API_URL}/mark-attendance`, studentData);
         return response.data;
      }
      catch(err){
        console.error(err.message);
        throw err;
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

export const checkAdminDetails = async(AdminData) =>{
    try{
        const response = await axios.post(`${API_URL}/adminSignin`,AdminData,{
            headers: { "Content-Type": "application/json" }});
        return response;
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
   catch(error){
    console.error("Axios Error:", error.message);
    console.error("Axios Response Data:", error.response?.data || "No response received");
    throw error;
   }
}