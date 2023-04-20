<script>
import Login from './components/Login.vue';
import drawer from './components/Viewer/drawer.vue';
import mainlist from './components/Viewer/mainlist.vue';
import PwIntegration from './components/Element-Integrations/PwIntegration.vue';

export default {
  data() {
    return {
      loginStatus: false,
      window: "password",
      drawerPanel: "Passwords",
      handlerObj: {},
    }
  },
  components: {
    Login,
    drawer,
    mainlist,
    PwIntegration
  },
  watch: {
    loginStatus() {
      if(this.loginStatus === true){
        this.window = "main";
      }
    },
  },
  mount: {

  },
  methods: {
    HandleHandlerObj(e){
      this.handlerObj = e;
      this.window = e.type;
    }
  }
}
</script>

<template>

  <div v-if="window === 'login'" id="loginContainer" class="mainContainer">
    <Login @response="(status) => loginStatus = status"></Login>
  </div>

  <div id="globalContainer" v-if="window === 'main'" class="mainContainer" >
    <drawer @currentPanel="(_curPanel) => drawerPanel = _curPanel"></drawer>
    <mainlist @handlerObj="(_handlerObj) => this.HandleHandlerObj(_handlerObj)" :curPanel=drawerPanel></mainlist>
  </div>

  <div id="pwInteractionContainer" v-if="window === 'password'" class="mainContainer elementContainer">
      <PwIntegration :element=handlerObj > </PwIntegration>
  </div>

  <div id="noteInteractionContainer" v-if="window === 'note'" class="mainContainer elementContainer">
        <!-- <noteInteraction :element=element > </noteInteraction> -->
  </div>

  <div id="contactInteractionContainer" v-if="window === 'contact'" class="mainContainer elementContainer">
      <!-- <contactInteraction :element=element > </contactInteraction> -->
  </div>

  <div id="settingsContainer" v-if="window === 'view'" class="mainContainer">

  </div>

  <div style=" position: absolute; bottom: 0px; left: 10px;" class="unselectable">
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

  .elementContainer{
    min-width: 300px;
    width: 22%;
    min-height: 500px;
    height: 65%;
  }

</style>

<style>
  @import './assets/main.css';
</style>