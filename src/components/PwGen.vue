<script>
export default {

    data(){
        return {
            lowerCase: GetSettingLower(),
            upperCase: GetSettingUpper(),
            numbers: GetSettingNumber(),
            symbols: GetSettingSymbol(),
            length: GetSettingPwLenght(),
            createdPw: "",
        }
    },
    components: {
        
    },
    props: {
        
    },
    methods: {
        genPw(){
            if(isNaN(this.length) || this.length == ""){
                alert("it has be an number...");
                return;
            }
            this.createdPw = GeneratePassword(this.length, this.lowerCase, this.upperCase, this.numbers, this.symbols); 
        },
        async copyPw(){
            navigator.clipboard.writeText(this.createdPw);
        },
        goBack(){
            this.$emit('changeWindow', {type: "main"})
        },
        AddPw(){
            this.$emit('changeWindow', {type: "password", mode: "add", pw: this.createdPw})
        }


    },
    created() {
        
    },
    mounted(){
        
    },
    watch: {
        
    },

}
</script>

<template>
    <div id="container">
        <h1>Password Generator</h1>
        <div id="settingsBox">
            <div class="settingWrapper"><input type="checkbox" v-model="lowerCase"><p>Lowercase</p></div>
            <div class="settingWrapper"><input type="checkbox" v-model="upperCase"><p>Uppercase</p></div>
            <div class="settingWrapper"><input type="checkbox" v-model="numbers"><p>Numbers</p></div>
            <div class="settingWrapper"><input type="checkbox" v-model="symbols"><p>Symbols</p></div>
        </div>
        <div id="lengthBox">
            <input type="number" id="lenghtInput" v-model="length">
            <p>length</p>
        </div>
        <input type="text" v-model="createdPw" class="txtInput">
        <div id="btnWrapper">
            <button @click="genPw()">Generate Password</button>
            <button id="copyBtn" @click="copyPw()">Copy</button>
            <button id="addBtn"  @click="AddPw()">Add new Password</button>
        </div>
        <button id="cancelBtn" @click="goBack()">Exit</button>
    </div>
</template>

<style scoped>
    #container{
        background-color: rgb(63, 63, 63);
        width: 100%;
        height: 100%;
        border-radius: 12px;
        flex-direction: column;
        position: relative;
    }

    h1 {
        text-align: center;
    }

    .txtInput {
        margin: 10px calc(10% - 15px) 0 calc(10% - 15px);
        width: 80%;
        height: 30px;
        background-color: #222;
        border-radius: 12px;
        border-width: 1px;
        border-color: #FFF;
        padding: 1px 15px;
        outline: none;
        position: relative;
        color: white;
        text-align: center;
    }

    button{
        margin: 30px 0 0 0;
        width: 50%;
        height: 35px;
        background-color: hsl(212, 100%, 50%);
        border-radius: 12px;
        border-width: 0px;
        padding: 1px 15px;
        outline: none;
    }

    #lengthBox{
        display: flex;
        position: relative;
        margin-bottom: 10px;
        
    }

    #lengthBox p {
        margin: 0;
        position: relative;
        left: -15px;
        top: 2.5px
    }
    #lenghtInput{
        width: 20px;
        height: 20px;
        text-align: center;
        background-color: #222;
        border-radius: 12px;
        border-width: 1px;
        border-color: #FFF;
        padding: 1px 15px;
        outline: none;
        position: relative;
        color: white;
        margin-left: 50%;
        transform: translateX(-50%);

    }

    #settingsBox{
        display: flex;
        position: relative;
        left: 50%;
        width: fit-content;
        transform: translateX(-50%);
    }

    .settingWrapper{
        margin: 5px;
        display: flex;;
    }

    #btnWrapper{
        display: flex;
        justify-content: space-around;
    }
    
    #copyBtn{
        width: 15%;
        background-color: hsl(273, 100%, 65%);
    }
    #addBtn{
        width: 25%;
        background-color: hsl(273, 100%, 65%);
    }

    #cancelBtn{
        margin-top: 70px;
        width: 14%;
        margin-left: 83%;
        background-color: hsl(0, 67%, 60%);
        color: white;
    }
</style>