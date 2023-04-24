<script>
import Login from './components/Login.vue';
import drawer from './components/Viewer/drawer.vue';
import mainlist from './components/Viewer/mainlist.vue';
import PwIntegration from './components/Element-Integrations/PwIntegration.vue';
import NoteIntegration from './components/Element-Integrations/NoteIntegration.vue';
import ContactIntegration from './components/Element-Integrations/ContactIntegration.vue';
import { registerRuntimeCompiler } from 'vue';

export default {
  data() {
    return {
      key: "",

      loginStatus: false,
      window: "login",
      drawerPanel: "Passwords",
      handlerObj: {},
      element: {type: "cancel"},

      pwList: [],

      noteList: [],

      contactList: [],
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
    key() {
      this.window = "main";
      this.pwList = LoadPw(this.key);
      this.noteList = LoadNotes(this.key);
      this.contactList = LoadContacts(this.key);
    },
  },
  mount: {

  },
  methods: {
    HandleHandlerObj(e){
      if(e.mode == "del"){
        this.DeleteElement(e);
        return;
      }
      this.handlerObj = e;
      this.window = e.type;
    },
    handleElementCallback(e){
      this.window = "main";
      if(e.type === "cancel") {return} 
      if(e.mode === "add") this.AddElement(e);
      if(e.mode === "edit") this.EditElement(e);

      if(e.type === "password"){
        savePw(this.pwList, this.key);
      } else if(e.type === "note"){
        saveNotes(this.noteList,  this.key);
      } else if(e.type === "contact"){
        saveContacts(this.contactList,  this.key);
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

    DeleteElement(e) {
        const response = confirm("do you want to delete: " + e.name);
        if(response){
            delete e.mode;
            if(e.type === "password") {
                this.pwList = this.pwList.filter((t) => JSON.stringify(t) !== JSON.stringify(e));
                savePw(this.pwList, this.key);
            } else if (e.type === "note") {
                this.noteList = this.noteList.filter(JSON.stringify(t) !== JSON.stringify(e));
                saveNotes(this.noteList,  this.key);
            } else if (e.type === "contact") {
                this.contactList = this.contactList.filter(JSON.stringify(t) !== JSON.stringify(e));
                saveContacts(this.contactList,  this.key);
            }
        }
            
    },
  }
}
</script>

<template>

  <div v-if="window === 'login'" id="loginContainer" class="mainContainer">
    <Login @key="(_key) => this.key = _key"></Login>
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