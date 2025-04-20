<template>
    <div>
    <h1>{{ student.name }}</h1>
    <h2>{{ student.collageID }}</h2>
    <h3>{{ student.days }}</h3>
    <button @click="$emit('logout')">Logout</button>
    <button @click="isCameraOn = !isCameraOn">mark attendence</button>
  </div>
  
  <div class="section" v-if = "isCameraOn">
    <p v-if="!isCameraReady">Loading camera...</p>
          <h2>Scan QR Code</h2>
        <qr-stream
        @decode="onDecode"
        @init-error="onInitFail"
      />
       </div>
</template>

<script>
   import { QrStream } from 'vue3-qr-reader';
  export default{
    components:{
        QrStream
    },
    props:{
       student: Object
    },
    emits : ["logout"],
    data(){
        return{
            isCameraOn:false,
            isCameraReady:false,
        }
    },
    methods:{
      onDecode(decodedText){
           //this.isCameraReady = true;
           alert(`${decodedText}`);
           this.isCameraOn = false;

      },
      onInitFail(error) {
            console.error("Camera init failed:", error);
            this.isCameraOn = false;
      }
   
    }
  }
</script>
<style scoped>
  .section{
      margin : auto;
      width: 50%;
  }
</style>