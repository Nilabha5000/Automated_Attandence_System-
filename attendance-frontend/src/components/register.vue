<template>
    <div class = "container">
        <h1>Admin Registration form</h1>
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

<style scoped>
   .container{
      padding: 15px;
       width : 50%;
       margin : auto;
       background-color: rgba(255, 255, 255, 0.703);
   }
   *{
       color : black;
   }
   .section{
      display: flex;
      align-items: end;
      justify-content: center;
      
   }
   h1{
      text-align: center;
   }
   form{
      
      display : flex;
      flex-direction: column;
   }
   input , button{
        font-size: medium;
       text-align: center;
       border-radius: 15px;
       padding : 20px;
        margin-top : 20px;
        width : 500px;
   }
   button{
       color : white;
       font-weight: bold;
   }
</style>
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
                this.$router.push("/signin");
              }
              catch(error){
                  console.log(error.message);
                  alert("Error adding admin: " + (error.response?.data?.message || "Server not responding"));
              }

           }
       }
      }
</script>