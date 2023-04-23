<script>
export default {
    data() {
        return {
            elementName: null,
            elementNote: "",
            elementFolder: "",

            noName: false,
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
                    this.elementNote = this.element.note;
                    this.elementFolder = this.element.folder;
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

            if(this.elementName == null){
                this.elementName = "";
                this.noName = true;
                return
            } 
        

            if(this.elementFolder == '') this.elementFolder = "none";

            this.$emit('callback', {
                mode: this.element.mode, 
                name: this.elementName, 
                note: this.elementNote,
                folder: this.elementFolder,
                type: this.element.type,
                id: this.element.id, 
            });
            
        },
    }
}
</script>

<template>

    <div id="elementContainer">
        <h1 class="elementHeader">{{element.mode.charAt(0).toUpperCase() + element.mode.slice(1)}} Notes</h1>
        <div class="elementField">
            <h2>Name</h2>
            <div class="elementInput"><input type="text" placeholder="Name" v-model="elementName" :readonly="element.mode === 'view'"></div>
            <div class="elementLowerTextWrapper" v-if="element.mode === 'add' || element.mode === 'edit'">
            <p v-if="this.elementName == ''" class="warningText" :class="{redWarningText: noName}">Name cant be empty</p>
            </div>
        </div>
        <div class="elementField">
            <h2>Notes</h2>
            <div class="elementField" id="NoteField">
                <textarea placeholder="Notes here" id="noteTextNotes" v-model="elementNote" :readonly="element.mode === 'view'"></textarea>
            </div>
        </div>
        <div class="elementField">
            <h2>Folder</h2>
            <div class="elementInput"><input type="text" placeholder="Folder" v-model="elementFolder" :readonly="element.mode === 'view'"></div>
        </div>
        <div class="elementField" id="PwLastField">
            <button class="cancelBtn" :class="{largebtn: element.mode === 'view'}" @click="Cancel()">Cancel</button>
            <button class="saveBtn" v-if="element.mode === 'add' || element.mode === 'edit'" @click="Save()">Save</button>
        </div>
    </div>


</template>

<style scoped>
    @import '../../assets/elements.css';
</style>