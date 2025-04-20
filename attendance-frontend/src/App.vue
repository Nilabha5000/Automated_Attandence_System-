<script>
  import register from './components/register.vue';
  import signIn from './components/sign-in.vue';
  import Dashboard from './components/dashboard.vue';
import Admin from './components/admin.vue';
   export default{

    components:
      {register,signIn,Dashboard,Admin},
       
       data(){
          return{
             isAuthenticated:false,
             showRegister:false,
             studentInfo : null
          }
       },
       methods:{
         handleSignIn(student) {
               this.studentInfo = student
              this.isAuthenticated = true;  // Set authentication to true
         },
         handleSignOut(){
              this.isAuthenticated = false;
         },
         goToRegister(){
             this.showRegister = true;
         }
       }
      }

</script>

<template>
      <div v-if="!isAuthenticated">
    <register v-if="showRegister" />
    <sign-in v-else @signed-in="handleSignIn" @no-account="goToRegister" />
  </div>
  <Dashboard v-else :student="studentInfo" @logout="handleSignOut" /> 
 <!--<Admin/> -->
</template>

