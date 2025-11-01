<template>
    <img v-if = "studentImage" :src = "studentImage">
    <div class = "student-details-section">
    <h1>{{ student.name }}</h1>
    <h2>{{ student.collageID }}</h2>
    <h3>{{ student.days }}</h3>
    <button @click="$router.push('/signin')">Logout</button>
    </div>
    <button  @click="isCameraOn = !isCameraOn">mark attendence</button>
  <div class="section" v-if = "isCameraOn">
    <p v-if="!isCameraReady">Loading camera...</p>
         <button @click = "isQrAttendance = !isQrAttendance">mark attendance by QR code </button>
         <button @click = "isFaceAttendance = !isFaceAttendance">Mark attendance by face</button>
        <qr-stream
        @decode="onDecode"
        @init-error="onInitFail"
        v-if = "isQrAttendance"
      />
      <div v-if = "isFaceAttendance">
          <FaceAttendance id = "Face-attendance" @send-blob="handleBlob" />
          <button @click = "markByFace">send image to mark attendance</button>
      </div>
    
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
   import FaceAttendance from './FaceAttendance.vue';
   import { ref } from 'vue';
   import { markAttendance,getPresentDays,showStudentImage,markAttendanceByFace } from '@/services/api';
   import { formatDate } from '@vueuse/core';

   
  export default{
    components:{
        QrStream,
        FaceAttendance
    },
    setup(){
      const camRef = ref();
      const img = ref(null);
      
      return{
          camRef,
          img
      }
    },
    data(){
        return{
            isCameraOn:false,
            isCameraReady:false,
            isQrAttendance : false,
            isFaceAttendance:false,
            studentImage : null,
            student : {},
            presentDaysList : [],
        }
    },
    methods:{
      handleBlob(blob){
           this.student.image = null;
           this.student.image = blob;
           console.log("inside handleblob "+ blob);
      },
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
      async markByFace(){
         
          const response = await markAttendanceByFace({collageID : this.student.collageID, studentImage : this.student.image})
          .then(()=>{
             alert("attendance mark succesfully");
          })
          .catch(()=>{
              alert("attendance failed");
          })


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
      console.log(this.student);
      this.getPresentDaysList();

        showStudentImage({ collageID: this.student.collageID })
    .then((img) => {
      this.studentImage = img;  // already base64 string with prefix
    })
    .catch((err) => console.error(err));
    }
  }
</script>
<style >
  .student-details-section {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
#Face-attendance{
     width : 50%;
     height : 50%;
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