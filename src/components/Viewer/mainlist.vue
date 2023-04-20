<script>
export default {
    data() {
        return {
            pwList: [
                {name: "testname", username: "testuser", pw: "testPw", web: "https://google.com", folder: "none", type: "password"},
                {name: "testname2", username: "testuser", pw: "testPw", web: "testwebsite.org", folder: "none", type: "password"},
                {name: "testname3", username: "testuser", pw: "testPw", web: "testwebsite.org", folder: "none", type: "password"},
            ],

            noteList: [
                {name: "testname", note: "testnote", folder: "none", type: "note"}
            ],

            contactList: [
                {name: "testname", email: "testuser", number: "testPw", bday: "testwebsite.org", address: "none", city: "none", type: "contact"}
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
        LaunchWebsite(url) {
            window.open(url, '_blank').focus();
        },

        async CopyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
                console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        },

        DeleteElement(e) {
            const response = confirm("do you want to delete: " + e.name);
            if(response){
                if(e.type === "password") {
                    this.pwList = this.pwList.filter((t) => t !== e)
                } else if (e.type === "note") {
                    this.noteList = this.noteList.filter((t) => t !== e)
                } else if (e.type === "contact") {
                    this.contactList = this.contactList.filter((t) => t !== e)
                }
            }
            
        },
        LaunchElement(e){
            //alert(e.name);
        }
    }
}
</script>

<template>
    <div id="mainListContainer">

        <div id="mainHeader">
            <h2 class="unselectable">{{curPanel}}</h2>
            <button>Add Item</button>
        </div>

        <div id="listContainer">
            <div v-if="this.curPanel == 'Notes'" v-for="note in this.noteList" class="listElement"  @click="LaunchElement(note)">

                <img src="../../assets/icons/test.png">
                <div class="textTitle">
                    <h4>{{note.name}}</h4>
                </div>
                <div class="listNavbar">
                    <img src="../../assets/icons/edit.png" @click="EditElement(note)">
                    <img src="../../assets/icons/delete.png" @click="DeleteElement(note)">
                </div>

            </div>

            <div v-else-if="this.curPanel == 'Contacts'" v-for="contact in this.contactList" class="listElement" @click="LaunchElement(contact)">

                <img src="../../assets/icons/test.png">
                <div class="textTitle">
                    <h4>{{contact.name}}</h4>
                </div>
                <div class="listNavbar">  
                    <img src="../../assets/icons/edit.png" @click="EditElement(contact)">
                    <img src="../../assets/icons/delete.png" @click="DeleteElement(contact)">
                </div>

            </div>

            <div v-else v-for="pw in this.pwList" class="listElement"  @click="LaunchElement(pw)">

                <img src="../../assets/icons/test.png">
                <div class="textTitle">
                    <p>{{pw.web}}</p>
                    <p><small>{{pw.username}}</small></p>
                </div>

                <div class="listNavbar">
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
        cursor: pointer;
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
    }

    .textTitle p{
        margin: 1px;
    }

    .textTitle h4{margin: 0;}

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