<script>
export default {
    data() {
        return {
            title: "Passwords",
            pwList: [
                {name: "testname", username: "testuser", pw: "testPw", web: "https://google.com", folder: "none"},
                {name: "testname", username: "testuser", pw: "testPw", web: "testwebsite.org", folder: "none"},
                {name: "testname", username: "testuser", pw: "testPw", web: "testwebsite.org", folder: "none"},
            ],

            noteList: [
                {name: "testname", note: "testnote", folder: "none"}
            ],

            contactList: [
                {name: "testname", email: "testuser", number: "testPw", bday: "testwebsite.org", address: "none", city: "none"}
            ]
        }
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
                if(this.title === "Passwords") {
                    this.pwList = this.pwList.filter((t) => t !== e)
                } else if (this.title === "Notes") {
                    this.noteList = this.noteList.filter((t) => t !== e)
                } else if (this.title === "Contacts") {
                    this.contactList = this.contactList.filter((t) => t !== e)
                }
            }
            
        }
    }
}
</script>

<template>
    <div id="mainListContainer">

        <div id="mainHeader">
            <h2>Passwords</h2>
            <button>Add Item</button>
        </div>

        <div id="listContainer">
            <div v-if="this.title == Notes" v-for="note in this.noteList" class="listElement" >
                
            </div>

            <div v-else-if="this.title == Contacts" v-for="contact in this.contactList" class="listElement" >

            </div>

            <div v-else v-for="pw in this.pwList" class="listElement" >

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