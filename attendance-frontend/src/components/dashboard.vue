<template>
    <div class = "student-details-section">
    <h1>{{ student.name }}</h1>
    <h2>{{ student.collageID }}</h2>
    <h3>{{ student.days }}</h3>
   <!-- <button @click="$emit('logout')">Logout</button>  -->
    </div>
    <button @click="isCameraOn = !isCameraOn">mark attendence</button>
  
  
  <div class="section" v-if = "isCameraOn">
    <p v-if="!isCameraReady">Loading camera...</p>
          <h2>Scan QR Code</h2>
        <qr-stream
        @decode="onDecode"
        @init-error="onInitFail"
      />
  </div>
  
  <div class = "present-days-section" v-if = "presentDaysList.length !== 0">
       <h2>Your present days :</h2>
      <ol>
        <li v-for = "i of presentDaysList" :key = "i">{{formatDate(i)}}</li>
      </ol>
  </div>
  <p v-else> You are not present in a single day !</p>
</template>

<script>
   import { QrStream } from 'vue3-qr-reader';
   import { markAttendance,getPresentDays } from '@/services/api';
   import { formatDate } from '@vueuse/core';
  export default{
    components:{
        QrStream
    },
    data(){
        return{
            isCameraOn:false,
            isCameraReady:false,
            student : {},
            presentDaysList : [],
        }
    },
    methods:{
      async onDecode(decodedText){
           //this.isCameraReady = true;
           try{
            let studentData = JSON.parse(decodedText);
            console.log(studentData);
            if(this.student.collageID === studentData.collageID){
              await markAttendance(studentData);
              alert("attendence mark succesfully");
            }
            else{
               throw "Provided QR code is not for " + this.student.name; 
            }
                 
           }
           catch(err){
              alert(err);
           }
           this.isCameraOn = false;

      },
      onInitFail(error) {
            console.error("Camera init failed:", error);
            this.isCameraOn = false;
      },
      async getPresentDaysList(){
          try{
              const response = await getPresentDays({collageID : this.student.collageID});
              this.presentDaysList = response.presentList;
          }catch(err){
              alert(err);
          }
      },
      formatDate(dateStr) {
       const date = new Date(dateStr);
       return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
    },
 

    mounted(){
      const stored = localStorage.getItem("student");
      this.student = JSON.parse(stored);

      this.getPresentDaysList();
    }
  }
</script>
<style scoped>
  .section{
      background-color: #ffe6e6;
      margin : auto;
      width: 50%;
  }
  .present-days-section{
     margin-top : 30px;
  }
</style>