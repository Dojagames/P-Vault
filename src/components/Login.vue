<script>
    export default {
        
        data(){
            return {
                pw: "test123",
                pwInput: "",
            }
        },
        methods: {
            checkPw(){
                if(this.pwInput === this.pw) {
                    this.$emit('response', true)
                } else {
                    alert("fail");
                }
            },
        }
    }
</script>

<template>
<h1>Login</h1>
<form  @submit.prevent="checkPw">
    <input id="username" type="text">
    <input v-model="pwInput" type="password">
    <button>Login</button>
</form>
</template>

<style scoped>
    h1{
        text-align: center;
    }

    form {
        display: flow-root;
    }

    input{
    margin: 20px calc(10% - 15px) 0 calc(10% - 15px);
    width: 80%;
    height: 30px;
    background-color: #222;
    border-radius: 12px;
    border-width: 1px;
    border-color: #FFF;
    padding: 1px 15px;
    outline: none;
    }

    input:focus    {
        border-color: hsl(212, 100%, 50%);
    }

    button{
    margin: 20px 35% 0 35%;
    width: 30%;
    height: 30px;
    background-color: hsl(212, 100%, 50%);
    border-radius: 12px;
    border-width: 0px;
    padding: 1px 15px;
    outline: none;
}

</style>
