<script>
export default {

    data(){
        return {
            
        }
    },
    components: {
        
    },
    props: {
        
    },
    methods: {
        
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
        <div id="PwElement">
            <h1>Password Generator Preset</h1>
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
        </div>
        <div id="ChangePwElement">
            
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

    h1{
        text-align: center;
        margin: 0;
        padding-top: 10px;
    }

    #PwElement{
        border: 1px solid white;
        margin: 10px;
        padding: 5px;
        position: relative;
        width: 35%;
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
</style>