<template>
      <form @submit.prevent = "signIn">
          <input v-model = credentials.collageID placeholder="Collage ID">
          <input type = "password" v-model = credentials.password placeholder="Student password">
          <button type = "submit">Sign in</button>
          <p>No account? <a @click="$emit('no-account')">Register here</a></p>
      </form>
</template>

<script>
    import { checkDetails} from '@/services/api';
    export default{

        data(){
            return{
                credentials:{collageID: "",password: ""},
            }
        },
        methods:{
             async signIn(){
                try{
                    console.log("Sending:", this.credentials);
                    const response = await checkDetails(this.credentials);
                    const student = response.student;
                    this.$emit("signed-in",student);
                   // alert("signin succesfully");
                }
                catch(error){
                       console.log(error.message);
                       alert(error.response?.data?.message || "Sign-in failed");
                }
             }
        }
    }
</script>

<style scoped>
   a{
      text-decoration: underline;
      color : lightblue;
   }
   a:hover{
      color : red;
   }
</style>