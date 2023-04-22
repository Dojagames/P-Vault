<script>
export default {
    data() {
        return {
            elementName: "",
            elementUsername: "",
            elementPw: "",
            elementWeb: "",
            elementFolder: "",
        }
    },
    props: {
        element: Object,
    },
    components: {
        
    },
    watch: {
        
    },
    mount: {
        
    },
    methods: {
        Cancel(){
            this.$emit('callback', {type:"cancel"});
        },

        Save(){
            this.$emit('callback', {
                mode: this.element.mode, 
                name: this.elementName, 
                username: this.elementUsername, 
                pw: this.elementPw, 
                web: this.elementWeb,
                folder: this.elementFolder,
                type: this.element.type,
                id: this.element.id, 
            });
        },
    }
}
</script>

<template>

    <div id="viewContainer" v-if="element.type === 'view'" class="elementContainer">

    </div>

    <div id="addContainer" v-if="true" class="elementContainer">

        <h1 class="elementHeader">Add Password</h1>
        <div class="elementField">
            <h2>Name</h2>
            <div class="elementInput"><input type="text" placeholder="Name" v-model="elementName"></div>
            <div class="elementField">
                <h2>LoginDetail</h2>
                <div class="elementInput"><input type="text" placeholder="Username" id="usernameTextPw" v-model="elementUsername"></div>
                <div class="elementInput"><input type="text" placeholder="Password" id="passwordTextPw" v-model="elementPw"></div>
                <p id="genPw"><small>Generate Password</small></p>
                <div class="elementInput" style="margin-top: 20px;"><input type="text" placeholder="Website" v-model="elementWeb"></div>
            </div>
            <div class="PwField">
                <h2>Folder</h2>
                <div class="elementInput"><input type="text" placeholder="Folder" v-model="elementFolder"></div>
            </div>
            <div class="elementField">
                <button class="cancelBtn" @click="Cancel()">Cancel</button>
                <button class="saveBtn" @click="Save()">Save</button>
            </div>
        </div>

    </div>

    <div id="editContainer" v-if="element.type === 'add'" class="elementContainer">

    </div>

</template>

<style scoped>
    @import '../../assets/elements.css';
</style>