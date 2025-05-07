<template>
    <div>
      <p>Search student by collage ID</p>
        <input v-model = "collageID" placeholder = "collage Id">
        <button @click="search">Search</button>
        <button @click = "toAdd = !toAdd">add student</button>
        <div class = "container" v-if = "toAdd">
     
        <div class = "section">
           <form @submit.prevent = "registerStudent">
           <input v-model="student.name" placeholder="Student Name">
           <input v-model = "student.collageID" placeholder="Collage ID">
          <input v-model = "student.password" placeholder="Password">
          <button type = "submit">add</button>
          </form>
      </div>
     </div>
        <div v-if="studentRecord !== null">
            <h1>student details</h1>
            <h3>{{ studentRecord.name }}</h3>
            <h3>{{ studentRecord.collageID }}</h3>
            <h3>{{ studentRecord.daysPresent }}</h3>
        </div>
    </div>
    <div v-if = "records !== null">
      <h3>Student List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Collage Id</th>
            <th>days</th>
        </tr>
        </thead>
       
      <tbody>
        <tr v-for = "item in records">
            <td>{{ item.name }}</td>
            <td>{{ item.collageID }}</td>
            <td>{{ item.daysPresent }}</td>
        </tr>
      </tbody>
      </table>
    </div>
     <button @click = "startClass">start class</button>
</template>
<style>
    *{
       font-weight: bold;
       color : rgba(47, 44, 44, 0.688);
    }
    button{
      margin-left: 4px;
    }
</style>
<script>
   import { fetchAllStudents,addStudent,classInit } from '@/services/api';
   export default{
      data(){
          return{
            records : null,
            toAdd:false,
            collageID : "",
            studentRecord : null,
            student : {collageID : "", name : "" , password : ""},
          }
      },
      methods:{
        async getRecords(){
             try{
                const Response = await fetchAllStudents();
                this.records = Response.data;
             }
             catch(err){
                 console.log(err);
                 alert("error");
             }
        },
        async startClass(){
           try{
               await classInit();
               alert("Class stablished succesfully");
           }
           catch(err){
            alert("Class stablished unsuccesfully");
            console.log(err);
          }
        },
        search(){
             if(this.records !== null){
                  for(let item of this.records){
                      if(item.collageID === this.collageID){
                            this.studentRecord = item;
                            break;
                      }
                  }
             if(this.studentRecord === null){
              alert("student not found!");
              console.log("student not found"); 
             }   
            }
        },
        async registerStudent(){
            console.log("Registering student:", this.student);
              try{
                const response = await addStudent(this.student);
                console.log(response);
                alert("Student registered successfully!");
              }
              catch(error){
                  console.log(error.message);
                  alert("Error adding student: " + (error.response?.data?.message || "Server not responding"));
              }

           }
      },
      mounted(){
        this.getRecords();
      }
   }
</script>