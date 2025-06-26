<template>
    <div class = "student-details-section">
    <h1>{{ student.name }}</h1>
    <h2>{{ student.collageID }}</h2>
    <h3>{{ student.days }}</h3>
    <button @click="$router.push('/signin')">Logout</button>
    </div>
    <button  @click="isCameraOn = !isCameraOn">mark attendence</button>
  
  
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
              this.getPresentDaysList();
              alert("attendence marked succesfully!");
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
  .student-details-section {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.student-details-section h1 {
  font-size: 2rem;
  color: #333;
}

.student-details-section h2 {
  font-size: 1.5rem;
  color: #555;
}

.student-details-section h3 {
  font-size: 1.2rem;
  color: #777;
}

/* Button to toggle camera */
button {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #388e3c;
}

/* QR Section */
.section {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  padding: 20px;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 500px;
  text-align: center;
}

.section h2 {
  margin-bottom: 10px;
  color: #856404;
}

.section p {
  font-style: italic;
  color: #6c757d;
}

/* Attendance list section */
.present-days-section {
  margin: 30px auto;
  max-width: 500px;
  background-color: #e6f7ff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #b3e0ff;
}

.present-days-section h2 {
  margin-bottom: 10px;
  color: #0077b6;
}

.present-days-section ol {
  padding-left: 20px;
}

.present-days-section li {
  padding: 5px 0;
  font-size: 1rem;
  color: #444;
}

/* Message when no attendance */
p {
  text-align: center;
  color: #888;
  margin-top: 20px;
}
</style>