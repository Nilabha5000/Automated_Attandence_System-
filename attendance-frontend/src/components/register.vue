<template>
    <div class = "container">
     
       <div class = "section">
        <form @submit.prevent = "registerAdmin">
          <input v-model="admin.name" placeholder="Admin Name">
          <input v-model = "admin.adminID" placeholder="Admin ID">
          <input v-model = "admin.password" placeholder="Password">
          <button type = "submit">Register</button>
        </form>
        </div>
    </div>
</template>

<script>
   import { addAdmin } from '@/services/api';
 export default{
       data(){
          return{
            admin : {adminID : "", name : "" , password : ""},
          }
       },

       methods:{
           async registerAdmin(){
            console.log("Registering admin:", this.admin);
              try{
                const response = await addAdmin(this.admin);
                console.log(response);
                alert("admin registered successfully!");
              }
              catch(error){
                  console.log(error.message);
                  alert("Error adding admin: " + (error.response?.data?.message || "Server not responding"));
              }

           }
       }
      }
</script>