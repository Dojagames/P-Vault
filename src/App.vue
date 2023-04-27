<script>
import Login from './components/Login.vue';
import drawer from './components/Viewer/drawer.vue';
import mainlist from './components/Viewer/mainlist.vue';
import PwIntegration from './components/Element-Integrations/PwIntegration.vue';
import NoteIntegration from './components/Element-Integrations/NoteIntegration.vue';
import ContactIntegration from './components/Element-Integrations/ContactIntegration.vue';
import PwGen from './components/PwGen.vue';
import Settings from './components/Settings.vue';

export default {
  data() {
    return {
      key: "",

      GlobalsortingType: getSortingType(),
      loginStatus: false,
      window: "login",
      drawerPanel: "Passwords",
      handlerObj: {},
      element: {type: "cancel"},

      pwList: [],

      noteList: [],

      contactList: [],

      listSearchText: "",
    }
  },
  components: {
    Login,
    drawer,
    mainlist,
    PwIntegration,
    NoteIntegration,
    ContactIntegration,
    PwGen,
    Settings,
  },
  watch: {
    key() {
      this.window = "main";

      LoadSettings();

      this.pwList = LoadPw(this.key);
      this.noteList = LoadNotes(this.key);
      this.contactList = LoadContacts(this.key);
    },
  },
  computed: {
    filteredPws(){
      if(this.GlobalsortingType == "alphabetical"){
        return this.pwList.sort(function(a, b){
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0; 
          });
      } else if(this.GlobalsortingType == "timeCreated"){
        return this.pwList.sort(function(a, b){
          var idA = a.id, idB = b.id;
          if (idA < idB) //sort string ascending
            return -1;
          if (idA > idB)
            return 1;
          return 0; //default return value (no sorting)
          });
      } else if (this.GlobalsortingType == "lastUsed"){
        return this.pwList.sort(function(a, b){
          var luA = a.lastUsed, luB = b.lastUsed;
          if (luA < luB)
            return 1;
          if (luA > luB)
            return -1;
          return 0;
          });
      } else if(this.GlobalsortingType == "mostUsed"){
        return this.pwList.sort(function(a, b){
          var TuA = a.timesUsed, TuB = b.timesUsed;
          if (TuA < TuB)
            return -1;
          if (TuA > TuB)
            return 1;
          return 0;
          });
      } else {
        alert("default + " + this.GlobalsortingType)
        return this.pwList
      }
    }
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
        saveNotes(this.noteList, this.key);
      } else if(e.type === "contact"){
        saveContacts(this.contactList, this.key);
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
        //alert(e.timesUses); 
        if(e.type === "password"){
            this.pwList[this.pwList.findIndex(t => t.id == e.id)] = e;
        } else if (e.type === "note"){ 
            this.noteList[this.noteList.findIndex(t => t.id == e.id)] = e;
        } else if (e.type === "contact"){ 
            this.contactList[this.contactList.findIndex(t => t.id == e.id)] = e;
        }
    },

    DeleteElement(e) {
        const response = confirm("do you want to delete: " + e.name);
        if(response){
            if(e.type === "password") {
                this.pwList = this.pwList.filter((t) => t.id !== e.id);
                savePw(this.pwList, this.key);
            } else if (e.type === "note") {
                this.noteList = this.noteList.filter((t) => t.id !== e.id);
                saveNotes(this.noteList,  this.key);
            } else if (e.type === "contact") {
                this.contactList = this.contactList.filter((t) => t.id !== e.id);
                saveContacts(this.contactList,  this.key);
            }
        }
            
    },

    DrawerClickElement(e){
      this.window = e;
    },

    changeSettings(e){
      this.window = "main"
      if(e.selectedType === "cancel") return;
      this.GlobalsortingType = e.selectedType;
    },

  }
}
</script>

<template>

  <div v-if="window === 'login'" id="loginContainer" class="mainContainer">
    <Login @key="(_key) => this.key = _key"></Login>
  </div>

  <div id="globalContainer" v-if="window === 'main'" class="mainContainer" >
    <drawer @currentPanel="(_curPanel) => drawerPanel = _curPanel" @passClick="(mode) => DrawerClickElement(mode)" @searchText="(text) => listSearchText = text"  :curPanel=drawerPanel ></drawer>
    <mainlist @handlerObj="(_handlerObj) => this.HandleHandlerObj(_handlerObj)" :curPanel=drawerPanel :pwList=filteredPws :noteList=noteList :contactList=contactList :searchText=listSearchText></mainlist>
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

  <div id="pwGenContainer" v-if="window === 'pwGen'" class="mainContainer">
    <PwGen @changeWindow="(_handlerObj) => this.HandleHandlerObj(_handlerObj)"></PwGen>
  </div>

  <div id="settingsContainer" v-if="window === 'settings'" class="mainContainer">
    <Settings @handler="(_obj) => changeSettings(_obj)"></Settings>
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

  #settingsContainer{
    min-width: 1000px;
    width: 65%;
    min-height: 500px;
    height: 70%;
    display: flex;
  }

  #pwGenContainer{
    min-width: 500px;
    width: 20%;
    min-height: 400px;
    height: 40%;
    max-height: 300px;
    display: flex;
  }

</style>

<style>
  @import './assets/main.css';
</style>