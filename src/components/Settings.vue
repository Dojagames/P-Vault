<script>
export default {

    data(){
        return {
            pwLength: GetSettingPwLenght(),
            lowerCase: GetSettingLower(),
            upperCase: GetSettingUpper(),
            numbers: GetSettingNumber(),
            symbols : GetSettingSymbol()
        }
    },
    components: {
        
    },
    props: {
        
    },
    methods: {
        GoBack(){
            this.$emit("handler", "");
        },
        ChangeSettings(){
            if(isNaN(this.pwLength) || this.pwLength == ""){
                alert("Number has to be a number");
                return;
            }
            SetSettingPwLenght(this.pwLength);
            SetSettingLower(this.lowerCase);
            SetSettingUpper(this.upperCase);
            SetSettingNumber(this.numbers);
            SetSettingSymbol(this.symbols);

            SaveSettings();
            this.$emit("handler", "");
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
        <div id="PwElement" class="settingElement">
            <h1>Password Generator Preset</h1>
            <div id="settingsBox">
                <div class="settingWrapper"><input type="checkbox" v-model="lowerCase"><p>Lowercase</p></div>
                <div class="settingWrapper"><input type="checkbox" v-model="upperCase"><p>Uppercase</p></div>
                <div class="settingWrapper"><input type="checkbox" v-model="numbers"><p>Numbers</p></div>
                <div class="settingWrapper"><input type="checkbox" v-model="symbols"><p>Symbols</p></div>
            </div>
            <div id="lengthBox">
                <input type="number" id="lenghtInput" v-model="pwLength">
                <p>length</p>
            </div>
        </div>
        <div id="ChangePwElement" class="settingElement">
            <h1>Change Password</h1>
        </div>

        <div id="exitWrapper">
            <button id="saveBtn" @click="ChangeSettings()">Save</button>
            <button id="exitBtn" @click="GoBack()">Exit</button>
        </div>
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

    .settingElement{
        border: 1px solid white;
        margin: 10px;
        padding: 5px;
    }

    h1{
        text-align: center;
        margin: 0;
        padding-top: 10px;
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
        color: white;
    }

    #PwElement{
       
        position: relative;
        width: 35%;
        min-width: 167px;
        min-height: 140px;
        max-height: 160px;
        height: 24%;
        display: block;
    }


    #settingsBox{
        display: flex;
        position: relative;
        width: fit-content;
        left: 50%;
        transform: translateX(-50%);
    }

    .settingWrapper{
        margin: 5px;
        display: flex;;
    }

    #lengthBox{
        display: flex;
        position: relative;
        margin-bottom: 10px;
        
    }

    #lengthBox p{
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



    #ChangePwElement{
        width: 60%;
        min-height: 140px;
        max-height: 160px;
        height: 24%;
        position: absolute;
        right: 0;
        top: 0;
   }

   #exitWrapper{
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: fit-content;
   }

   #exitBtn{
    background-color: grey;
    width: 20%;
    position: absolute;
    right: 10px;
   }

   #saveBtn{
    left: 10px;
    width: 60%;
    position: relative ;

   }
</style>