<script>
    export default {
        
        data(){
            return {
                pw: "test123",
                pwInput: "",
                pwInput2: "",
                exists: false,
                showPassword: false,
            }
        },
        methods: {
            checkPw(){
                if(CheckPassword(this.pwInput)){
                    this.$emit('key', this.pwInput);
                } else {
                    alert("fail");
                }
            },
            Register(){
                if(this.pwInput == this.pwInput2){
                    RegisterUser(this.pwInput);
                    this.$emit('key', this.pwInput)
                }
            }
        },
        created() {
            this.exists = checkIfUserExists();
        },
    }
</script>

<template>

    <div v-if="exists" class="container">
        <h1>Login</h1>
        <form  @submit.prevent="checkPw" class="row">
            <input v-model="pwInput" class="txtInput" v-bind:type="[showPassword ? 'text' : 'password']">
            <img :src="[showPassword ? '../../src/assets/icons/hide.png' : '../../src/assets/icons/view.png']" id="showPwBtn" @click="showPassword = !showPassword">
            <button>Login</button>
        </form>
    </div>
    <div v-else class="container">
        <h1>Register</h1>
        <form  @submit.prevent="Register" class="row">
            <input v-model="pwInput" class="txtInput" v-bind:type="[showPassword ? 'text' : 'password']">
            <img :src="[showPassword ? '../../src/assets/icons/hide.png' : '../../src/assets/icons/view.png']" id="showPwBtn" @click="showPassword = !showPassword">
            <input v-model="pwInput2" class="txtInput" v-bind:type="[showPassword ? 'text' : 'password']">
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


</style>
