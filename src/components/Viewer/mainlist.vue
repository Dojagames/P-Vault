<script>
export default {
    data() {
        return {

        }
    },
    props: {
        curPanel: String,
        searchText: String,
        pwList: Array,
        noteList: Array,
        contactList: Array,
    },
    components: {
        
    },
    watch: {
       
    },
    mount: {
        
    },
    methods: {
        LaunchWebsite(url) {
            if(url.substring(0,4) == "http" || url.substring(0,5) == "https"){
                window.open(url, '_blank').focus();
            } else {
                window.open("http://"+ url, '_blank').focus();
            }
           
        },

        getFavivon(_url){
            return GetFaviconLink(_url);
        },

        async CopyToClipboard(text) {
            navigator.clipboard.writeText(text);
        },

        DeleteElement(e) {
            this.$emit('handlerObj', Object.assign({}, e, {mode: "del"}));
        },

        LaunchElement(e){    
            e.isHovering = false;   
            this.$emit('handlerObj', Object.assign({}, e, {mode: "view"}));
        },
        
        EditElement(e){
            e.isHovering = false;
            this.$emit('handlerObj', Object.assign({}, e, {mode: "edit"}));
        },

        AddElement(){
            const _type = this.GetType(this.curPanel);
            this.$emit('handlerObj', {mode: "add", type: _type});
        },

        GetType(e){
            switch (e) {
                case "Passwords": return "password";
                    break;
                case "Notes": return "note";
                    break;
                case "Contacts": return "contact";
            };
        },


        RemovePassbackProperties(e){
            delete e.mode;
            delete e.isHovering;
            return e;
        },
    },
    computed: {
        filteredPws(){
            if(this.searchText == "" || this.searchText == undefined){
                return this.pwList;
            } else {
                return this.pwList.filter((t) => t.name.toLowerCase().includes(this.searchText.toLowerCase()) || t.web.toLowerCase().includes(this.searchText.toLowerCase()));
            }
        },
        filteredNotes(){
            if(this.searchText == "" || this.searchText == undefined){
                return this.noteList;
            } else {
                return this.noteList.filter((t) => t.name.toLowerCase().includes(this.searchText.toLowerCase()) || t.web.toLowerCase().includes(this.searchText.toLowerCase()));
            }
        },
        filteredContacts(){
            if(this.searchText == "" || this.searchText == undefined){
                return this.contactList;
            } else {
                return this.contactList.filter((t) => t.name.toLowerCase().includes(this.searchText.toLowerCase()) || t.web.toLowerCase().includes(this.searchText.toLowerCase()));
            }
        },
    }
}
</script>

<template>
    <div id="mainListContainer">

        <div id="mainHeader">
            <h2 class="unselectable">{{curPanel}}</h2>
            <button @click="AddElement()">Add Item</button>
        </div>

        <div id="listContainer">
            <div v-if="this.curPanel == 'Notes'" v-for="note in this.filteredNotes" class="listElement" @mouseover="note.isHovering = true" @mouseout="note.isHovering = false">

                <img src="../../assets/icons/test.png">
                <div class="textTitle" @click="LaunchElement(note);">
                    <h4>{{note.name}}</h4>
                </div>
                <div class="listNavbar" :style="note.isHovering ? 'display: block' : 'display: none' ">
                    <img src="../../assets/icons/edit.png" @click="EditElement(note)">
                    <img src="../../assets/icons/delete.png" @click="DeleteElement(note)">
                </div>

            </div>

            <div v-else-if="this.curPanel == 'Contacts'" v-for="contact in this.filteredContacts" class="listElement" @mouseover="contact.isHovering = true" @mouseout="contact.isHovering = false">

                <img src="../../assets/icons/test.png">
                <div class="textTitle" @click="LaunchElement(contact)">
                    <h4>{{contact.name}}</h4>
                </div>
                <div class="listNavbar" :style="contact.isHovering ? 'display: block' : 'display: none' ">  
                    <img src="../../assets/icons/edit.png" @click="EditElement(contact)">
                    <img src="../../assets/icons/delete.png" @click="DeleteElement(contact)">
                </div>

            </div>

            <div v-else-if="this.curPanel == 'Passwords'" v-for="pw in this.filteredPws" class="listElement" @mouseover="pw.isHovering = true" @mouseout="pw.isHovering = false">

                <img :src="getFavivon(pw.web)">
                <div class="textTitle" @click="LaunchElement(pw)">
                    <p>{{pw.web}}</p>
                    <p><small>{{pw.name}}</small></p>
                </div>

                <div class="listNavbar" :style="pw.isHovering ? 'display: block' : 'display: none' ">
                    <img src="../../assets/icons/launch.png" @click="LaunchWebsite(pw.web)">
                    <img src="../../assets/icons/copyUser.png" @click="CopyToClipboard(pw.username)">
                    <img src="../../assets/icons/CopyPw.png" @click="CopyToClipboard(pw.pw)">
                    <img src="../../assets/icons/edit.png" @click="EditElement(pw)">
                    <img src="../../assets/icons/delete.png" @click="DeleteElement(pw)">
                </div>

            </div>

        </div>

    </div>
</template>

<style scoped>
    #mainListContainer{
        background-color: rgb(63, 63, 63);
        width: 100%;
        height: 100%;
        border-radius: 0 12px 12px 0;
        display: flex;
        flex-direction: column;
    }

    #mainHeader {
        margin-top: 20px;
        margin-left: 30px;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between
    }

    #mainHeader h2 {
        margin: 0;
    }

    #mainHeader button{
        border: 1px solid white;
        border-radius: 20px;
        justify-self: end;
        height: 70%;
        margin-right: 50px;
        background-color: transparent;
        padding: 0 8px;
        color: white;
    }

    #listContainer{
        display: flex;
        flex-direction: column;
    }

    .listElement {
        display: flex;
        height: 50px;
        width: 100%;
        border: 1px solid;
        border-style: solid none;
        position: relative;
    }

    .listElement img {
        height: 45px;
        width: 45px;
        margin-left: 20px;
        align-self: center;
        border-radius: 50%;
    }

    .textTitle{
    margin-left: 30px;
    align-self: center;
    display: flex;
    flex-direction: column;
    width: auto;
    cursor: pointer;
    }

    .textTitle p{
        margin: 1px;
    }

    .textTitle p small{
        text-decoration: underline;
    }

    .textTitle h4{
        margin: 0;
        text-decoration: underline;
    }

    .listNavbar{
        align-self: center;
        position: absolute;
        right: 20px;
    }

    .listNavbar img {
        width: 32px;
        height: 32px;
    }

    .listNavbar img:hover {
        cursor: pointer;
    }
</style>