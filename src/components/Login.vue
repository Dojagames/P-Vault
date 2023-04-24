<script>
    export default {
        
        data(){
            return {
                pw: "test123",
                pwInput: "",
                pwInput2: "",
                exists: false,
                showPassword: false,
                wrongPw: false,
                noMatch: false,
                notLongEnougth: false,
            }
        },
        methods: {
            checkPw(){
                if(CheckPassword(this.pwInput)){
                    SaveSessionCookie(this.pwInput);
                    this.$emit('key', this.pwInput);
                } else {
                    this.pwInput = "";
                    this.wrongPw = true;
                }
            },
            Register(){
                if(this.pwInput == this.pwInput2){
                    if(this.pwInput.length <= 11){
                        this.notLongEnougth = true;
                        return;
                    } 
                    RegisterUser(this.pwInput);
                    SaveSessionCookie(this.pwInput);
                    this.$emit('key', this.pwInput);
                } else {
                    this.pwInput2 = "";
                    this.noMatch = true;
                }
            },
        },
        created() {
            this.exists = checkIfUserExists();
        },
        async mounted(){
            await this.$nextTick()
            var _tempKey = GetSessionCookie();
            if(_tempKey != null){
                this.$emit('key', _tempKey);
            }
        },
        watch: {
            pwInput(){
                if(this.pwInput != ""){
                    this.wrongPw = false;
                    this.notLongEnougth = false;
                    this.noMatch = false;
                }
            }
        }
    }
</script>

<template>

    <div v-if="exists" class="container">
        <h1>Login</h1>
        <form  @submit.prevent="checkPw" class="row">
            <input v-model="pwInput" class="txtInput" v-bind:type="[showPassword ? 'text' : 'password']">
            <img :src="[showPassword ? '../../src/assets/icons/hide.png' : '../../src/assets/icons/view.png']" id="showPwBtn" @click="showPassword = !showPassword">
            <div class="elementLowerTextWrapper">
                <p v-if="wrongPw" class="warningText">Wrong Password</p>
            </div>
            <button>Login</button>
        </form>
    </div>
    <div v-else class="container">
        <h1>Register</h1>
        <form  @submit.prevent="Register" class="row">
            <input v-model="pwInput" class="txtInput" v-bind:type="[showPassword ? 'text' : 'password']">
            <img :src="[showPassword ? '../../src/assets/icons/hide.png' : '../../src/assets/icons/view.png']" id="showPwBtn" @click="showPassword = !showPassword">
            <input v-model="pwInput2" class="txtInput" v-bind:type="[showPassword ? 'text' : 'password']">
            <div class="elementLowerTextWrapper">
                <p v-if="noMatch" class="warningText">Passwords have to match</p>
                <p v-if="notLongEnougth" class="warningText">Password has to at least 12 Characters long</p>
            </div>
            <button>Register</button>
        </form>
    </div>
        
</template>

<style scoped>
    h1{
        text-align: center;
    }


    .row {
        position: relative;
        height: 30px;
        width: 100%
    }

    .txtInput{
        margin: 20px calc(10% - 15px) 0 calc(10% - 15px);
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
    }

    .txtInput:focus    {
        border-color: hsl(212, 100%, 50%);
    }

    button{
        margin: 50px 35% 0 35%;
        width: 30%;
        height: 30px;
        background-color: hsl(212, 100%, 50%);
        border-radius: 12px;
        border-width: 0px;
        padding: 1px 15px;
        outline: none;
    }

#showPwBtn{
    height: 30px;
    filter: invert(100%);
    position: absolute;
    right: 10%;
    top: 70%;
}

.warningText{
margin: 0;
color: red;

}

.elementLowerTextWrapper{
    margin-left: calc(10% - 15px);
    padding-top: 6px;
    height: 18px;
    max-height: fit-content;
}
</style>
