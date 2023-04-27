<script>
import { initCustomFormatter } from 'vue';

export default {
    data() {
        return {
            elementName: null,
            elementUsername: "",
            elementPw: null,
            elementWeb: "",
            elementFolder: "",

            noName: false,
            noPw: false,
        }
    },
    props: {
        element: Object,
    },
    components: {
        
    },
    watch: {
        element: {
            handler(){
                if(this.element.mode === "view" || this.element.mode === "edit" ){
                    this.elementName = this.element.name;
                    this.elementUsername = this.element.username;
                    this.elementPw = this.element.pw;
                    this.elementWeb = this.element.web;
                    this.elementFolder = this.element.folder;
                }

                if(this.element.mode === "add" && this.element.pw != "" && this.element.pw != undefined){
                    this.elementPw = this.element.pw;
                }
            },
            immediate: true
        }
    },
    mount: {
        
    },
    methods: {
        Cancel(){
            this.$emit('callback', {type:"cancel"});
        },

        Save(){
            if(this.elementPw == null) this.elementPw = "";
            if(this.elementName == null) this.elementName = "";

            if (this.elementPw == '' || this.elementName == ''){
                if (this.elementPw == '') {this.noPw = true;} else {this.noPw = false;}
                if (this.elementName == '') {this.noName = true;} else this.noName = false;
                return
            }

            if(this.elementFolder == '') this.elementFolder = "none";
            if(this.element.id == undefined || this.element.id == null){
                this.element.id = getNewId();
            }


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
        genPw(){
            this.elementPw = GeneratePassword();
        }
    }
}
</script>

<template>

    <div id="elementContainer">

        <h1 class="elementHeader">{{element.mode.charAt(0).toUpperCase() + element.mode.slice(1)}} Password</h1>
        <div class="elementField">
            <h2>Name</h2>
            <div class="elementInput"><input type="text" placeholder="Name" v-model="elementName" :readonly="element.mode === 'view'"></div>
            <div class="elementLowerTextWrapper" v-if="element.mode === 'add' || element.mode === 'edit'">
            <p v-if="this.elementName == ''" class="warningText" :class="{redWarningText: noName}">Name cant be empty</p>
            </div>
            <div class="elementField">
                <h2>Login Credentials</h2>
                <div class="elementInput"><input type="text" placeholder="Username" id="usernameTextPw" v-model="elementUsername" :readonly="element.mode === 'view'"></div>
                <div class="elementInputWrapper">
                    <div class="elementInput"><input type="text" placeholder="Password" id="passwordTextPw" v-model="elementPw" :readonly="element.mode === 'view'"></div>
                    <div class="elementLowerTextWrapper" v-if="element.mode === 'add' || element.mode === 'edit'">
                        <p v-if="this.elementPw === ''" class="warningText" :class="{redWarningText: noPw}">Password cant be empty</p>
                        <p id="genPw" v-if="element.mode === 'add'" class="pointerCursor" @click="genPw()" ><small>Generate Password</small></p>
                    </div>
                </div>
                <div class="elementInput" style="margin-top: 20px;"><input type="text" placeholder="Website" v-model="elementWeb" :readonly="element.mode === 'view'"></div>
            </div>
            <div class="elementField">
                <h2>Folder</h2>
                <div class="elementInput"><input type="text" placeholder="Folder" v-model="elementFolder" :readonly="element.mode === 'view'"></div>
            </div>
            <div class="elementField">
                <button class="cancelBtn" :class="{largebtn: element.mode === 'view'}" @click="Cancel()">Cancel</button>
                <button class="saveBtn" v-if="element.mode === 'add' || element.mode === 'edit'" @click="Save()">Save</button>
            </div>
        </div>

    </div>

</template>

<style scoped>
    @import '../../assets/elements.css';
</style>