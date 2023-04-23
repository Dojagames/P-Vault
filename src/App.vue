<script>
import Login from './components/Login.vue';
import drawer from './components/Viewer/drawer.vue';
import mainlist from './components/Viewer/mainlist.vue';
import PwIntegration from './components/Element-Integrations/PwIntegration.vue';
import NoteIntegration from './components/Element-Integrations/NoteIntegration.vue';
import ContactIntegration from './components/Element-Integrations/ContactIntegration.vue';

export default {
  data() {
    return {
      loginStatus: false,
      window: "main",
      drawerPanel: "Passwords",
      handlerObj: {},
      element: {type: "cancel"},

      pwList: LoadPw("test"),

      noteList: [
          {name: "testname", note: "testnote", folder: "none", type: "note"}
      ],

      contactList: [
          {name: "testname", email: "testuser", number: "testPw", bday: "testwebsite.org", street: "testStreet", city: "testCity", type: "contact"}
      ],


    }
  },
  components: {
    Login,
    drawer,
    mainlist,
    PwIntegration,
    NoteIntegration,
    ContactIntegration
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
    },
    handleElementCallback(e){
      this.window = "main";
      if(e.type === "cancel") {return} 
      if(e.mode === "add") this.AddElement(e);
      if(e.mode === "edit") this.EditElement(e);

      if(e.type === "password"){
        savePw(this.pwList, "test");
      } else if(e.type === "note"){
        saveNotes(this.noteList, "test");
      } else if(e.type === "contact"){
        saveContacts(this.contactList, "test");
      }
    },

    AddElement(e){
        if(e.type === "password"){
            this.pwList.push(e);
        } else if(e.type === "note"){ 
            this.noteList.push(e);
        } else if(e.type === "contact"){ 
            this.contactList.push(e);
        }
    },

    EditElement(e){
        if(e.type === "password"){
            this.pwList[e.id] = e;
        } else if (e.type === "note"){ 
            this.noteList[e.id] = e;
        } else if (e.type === "contact"){ 
            this.contactList[e.id] = e;
        }
    },
  }
}
</script>

<template>

  <div v-if="window === 'login'" id="loginContainer" class="mainContainer">
    <Login @response="(status) => loginStatus = status"></Login>
  </div>

  <div id="globalContainer" v-if="window === 'main'" class="mainContainer" >
    <drawer @currentPanel="(_curPanel) => drawerPanel = _curPanel" :curPanel=drawerPanel ></drawer>
    <mainlist @handlerObj="(_handlerObj) => this.HandleHandlerObj(_handlerObj)" :curPanel=drawerPanel :pwList=pwList :noteList=noteList :contactList=contactList ></mainlist>
  </div>

  <div id="pwInteractionContainer" v-if="window === 'password'" class="mainContainer elementContainer">
      <PwIntegration @callback="(el) => this.handleElementCallback(el)" :element=handlerObj> </PwIntegration>
  </div>

  <div id="noteInteractionContainer" v-if="window === 'note'" class="mainContainer elementContainer">
        <NoteIntegration @callback="(el) => this.handleElementCallback(el)" :element=handlerObj> </NoteIntegration>
  </div>

  <div id="contactInteractionContainer" v-if="window === 'contact'" class="mainContainer elementContainer">
      <ContactIntegration @callback="(el) => this.handleElementCallback(el)" :element=handlerObj> </ContactIntegration>
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