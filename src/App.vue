<script>
import Login from './components/Login.vue';
import drawer from './components/Viewer/drawer.vue';
import mainlist from './components/Viewer/mainlist.vue';

export default {
  data() {
    return {
      loginStatus: false,
      window: "login",
    }
  },
  components: {
    Login,
    drawer,
    mainlist
  },
  watch: {
    loginStatus() {
      if(this.loginStatus === true){
        this.window = "main";
      }
    }
  },
  mount: {

  }
}
</script>

<template>
  <div v-if="window === 'login'" id="loginContainer" class="mainContainer">
    <Login @response="(status) => loginStatus = status"></Login>
  </div>
  <div id="globalContainer" v-if="window === 'main'" class="mainContainer" >
    <drawer></drawer>
    <mainlist></mainlist>
  </div>


  <div style=" position: absolute; bottom: 0px; left: 10px;">
    <p>©P-Vault 2023</p>
  </div>


</template>

<style scoped>
  .mainContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #globalContainer{
    min-width: 1000px;
    width: 65%;
    min-height: 500px;
    height: 70%;
    display: flex;
  }

  #loginContainer{
    min-width: 400px;
    width: 30%;
    min-height: 200px;
    height: 30%;
  }
</style>

<style>
  @import './assets/main.css';
</style>