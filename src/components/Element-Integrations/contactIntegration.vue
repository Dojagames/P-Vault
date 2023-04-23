<script>
export default {
    data() {
        return {
            elementName: null,
            elementNumber: "",
            elementEmail: "",
            elementBday: "",
            elementStreet: "",
            elementCity: "",

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
                    this.elementNumber = this.element.number;
                    this.elementEmail = this.element.email;
                    this.elementBday = this.element.bday;
                    this.elementStreet = this.element.street;
                    this.elementCity = this.element.city;
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
            if(this.elementName == null) {
                this.elementName = "";
                this.noPw = true;
                return;
            }

            if(this.elementFolder == '') this.elementFolder = "none";

            this.$emit('callback', {
                mode: this.element.mode, 
                name: this.elementName, 
                number: this.elementNumber, 
                email: this.elementEmail, 
                bday: this.elementBday,
                street: this.elementStreet,
                city: this.elementCity,
                type: this.element.type,
                id: this.element.id, 
            });
        },
    }
}
</script>

<template>

    <div id="elementContainer">
        <h1 class="elementHeader">{{element.mode.charAt(0).toUpperCase() + element.mode.slice(1)}} Contact</h1>
        <div class="elementField">
            <h2>Name</h2>
            <div class="elementInput"><input placeholder="Name" v-model="elementName" :readonly="element.mode === 'view'"></div>
            <div class="elementLowerTextWrapper" v-if="element.mode === 'add' || element.mode === 'edit'">
            <p v-if="this.elementName == ''" class="warningText" :class="{redWarningText: noName}">Name cant be empty</p>
            </div>
        </div>
        <div class="elementField">
            <h2>Details</h2>
            <div class="elementInput"><input type="text" placeholder="Number" v-model="elementNumber" :readonly="element.mode === 'view'"></div>
            <div class="elementInput"><input type="text" placeholder="Email" v-model="elementEmail" :readonly="element.mode === 'view'"></div>
            <div class="elementInput"><input type="text" placeholder="Birthday" v-model="elementBday" :readonly="element.mode === 'view'"></div>
        </div>
        <div class="elementField">
            <h2>Adress</h2>
            <div class="elementInput"><input type="text" placeholder="Street" v-model="elementStreet" :readonly="element.mode === 'view'"></div>
            <div class="elementInput"><input type="text" placeholder="City" v-model="elementCity" :readonly="element.mode === 'view'"></div>
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