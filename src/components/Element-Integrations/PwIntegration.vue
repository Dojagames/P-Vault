<script>
export default {
    data() {
        return {
            
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
            <div class="elementInput"><input type="text" placeholder="Name"></div>
            <div class="elementField">
                <h2>LoginDetail</h2>
                <div class="elementInput"><input type="text" placeholder="Username" id="usernameTextPw"></div>
                <div class="elementInput"><input type="text" placeholder="Password" id="passwordTextPw"></div>
                <p id="genPw"><small>Generate Password</small></p>
                <div class="elementInput" style="margin-top: 20px;"><input type="text" placeholder="Website" id="websiteTextPW"></div>
            </div>
            <div class="PwField">
                <h2>Folder</h2>
                <div class="elementInput"><input type="text" placeholder="Folder" id="folderTextPw"></div>
            </div>
            <div class="elementField">
                <button class="cancelBtn">Cancel</button>
                <button class="saveBtn">Save</button>
            </div>
        </div>

    </div>

    <div id="editContainer" v-if="element.type === 'add'" class="elementContainer">

    </div>

</template>

<style scoped>
    @import '../../assets/elements.css';
</style>