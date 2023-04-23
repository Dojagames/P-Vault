<script>
export default {
   data() {
      return {
        currentPanel: "Passwords",
        panels: [
            {name: "Passwords", imgSrc: "../../src/assets/icons/password.png"},
            {name: "Notes", imgSrc: "../../src/assets/icons/document.png"},
            {name: "Contacts", imgSrc: "../../src/assets/icons/contact-book.png"}
        ],
        folders: [
            "none", "gaming",
        ]
      }
   },
   props: {
    curPanel: String,
   },
   components: {
   
   },
   watch: {

   },
   mount: {
   
   },
   methods: {
    selectPanel(panel){
        this.$emit('currentPanel', panel.name);
        this.currentPanel = panel.name;
    }
   }
}
</script>

<template>
    <div id="drawerContainer">

        <div id="searchBox">
            <input type="text" placeholder="Search..">
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
            <div class="folderElement unselectable" v-for="folder in this.folders">
                <p>{{folder}}</p>
            </div>
        </div>

        <div id="navfooter"> 
            <div class="spacerLine"> </div>
            <div id="navfooterContainer"> 
                <img src="../../assets/icons/add.png">
                <img src="../../assets/icons/setting.png">
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
        overflow: hidden;
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
</style>