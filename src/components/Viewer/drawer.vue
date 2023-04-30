<script>
export default {
   data() {
      return {
        currentPanel: "Passwords",
        selectedFolderIndex: -1,
        panels: [
            {name: "Passwords", imgSrc: "../../src/assets/icons/password.png"},
            {name: "Notes", imgSrc: "../../src/assets/icons/document.png"},
            {name: "Contacts", imgSrc: "../../src/assets/icons/contact-book.png"}
        ],
        searchText: "",
      }
   },
   props: {
    curPanel: String,
    folders: Array,
   },
   components: {
   
   },
   watch: {
    folders(){
        alert(this.folders)
    }
   },
   mount: {
   
   },
   methods: {
    selectPanel(panel){
        this.$emit('currentPanel', panel.name);
        this.currentPanel = panel.name;
    },
    DrawerClick(e){
        this.$emit('passClick', e);
    },
    SendSearchText(){
        this.$emit('searchText', this.searchText);
    },
    SelectFolder(_i){
        if(_i == this.selectedFolderIndex) {
            this.$emit('folderSelect', "");
            this.selectedFolderIndex = -1;} 
        else{
            this.selectedFolderIndex = _i;
            this.$emit('folderSelect', this.folders[_i]);
        }


    }
   }
}
</script>

<template>
    <div id="drawerContainer">

        <div id="searchBox">
            <input type="text" @input="SendSearchText()" v-model="searchText" placeholder="Search..">
        </div>
    
        <div id="drawerPanels">
            <div v-for="panel in this.panels" class="panels" :class="{selected: panel.name == this.curPanel}" v-on:click="selectPanel(panel)">
                <img :src="panel.imgSrc">
                <p class="panelText unselectable">{{panel.name}}</p>
            </div>
        </div>

        <div class="spacerLine"></div>

        <div id="drawerFolder">
            <div id="folderHeader" class="unselectable"> 
                <p>Folder</p>
            </div>
            <div id="folderElementWrapper">
                <div class="folderElement unselectable" v-for="(folder, index) in this.folders">
                    <p @click="SelectFolder(index)" :class="(index == this.selectedFolderIndex)?'selectedFolder':'unselectedFolder'">{{folder}}</p>
                </div>
            </div>
        </div>

        <div id="navfooter"> 
            <div class="spacerLine"> </div>
            <div id="navfooterContainer"> 
                <img src="../../assets/icons/add.png" @click="DrawerClick('pwGen')">
                <img src="../../assets/icons/setting.png" @click="DrawerClick('settings')">
            </div>
        </div>

    </div>
</template>

<style>
    #drawerContainer{
        width: 20%;
        height: 100%;
        background-color: rgb(36, 36, 36);
        display: flex;
        color:white;
        border-radius: 12px 0 0 12px;
        flex-direction: column;
        position: relative;
    }
    #searchBox{
        border: 1px solid white;
        border-radius: 12px;
        margin-top: 10px;
        margin-left: 15px;
        height: 30px;
        width: calc(100% - 30px);
    }

    #searchBox input{
        margin-top: 5px;
        margin-left: 10px;
        background-color: transparent;
        width: calc(100% - 20px);
        border: none;
        outline: none;
        color: white;
    }

    .panels {
        display: flex;
        height: 40px;
        margin-top: 10px;
    }

    .panels:hover{
        background-color: gray;
    }

    .panels img{
        margin-left: 20px;
        align-self: center;
        width: 32px;
    }
    
    .panels p{
        align-self: center;
        margin-left: 20px;
    }

    .spacerLine{
        height: 2px;
        width: 100%;
        background-color: white;
        margin-top: 5px;
    }

    #drawerFolder{
        position: relative;
        
    }

    #folderElementWrapper{
        overflow: scroll;
        min-height: 220px;
        height: calc(100vh - 580px);
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    #folderElementWrapper::-webkit-scrollbar {
        display: none;
    }

    
    #folderHeader{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    }

    #folderHeader p{
        align-self: center;
    }



    .folderElement p{
    margin-left: 15px;
    }



    #navfooter{
    height: 60px;
    background-color: rgb(36, 36, 36);
    width: 100%;
    z-index: 100;

    position: absolute;
    bottom: 0;

    border-radius: 0 0 0 12px;

    }

    #navfooterContainer{
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }

    #navfooterContainer img:hover{
        cursor: pointer;
    }

    .selected{
        background-color: hsla(0, 0%, 100%, 0.24);
    }

    .selectedFolder{
        color: hsl(216, 89%, 57%);
    }
</style>