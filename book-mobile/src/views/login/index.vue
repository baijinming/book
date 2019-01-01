<template>
  <div class="container">
    <h1>图书管理系统</h1>
    <div class="input-warp">
      用户名：
      <input v-model="form.username" type="text" placeholder="请输入用户名">
    </div>
    <div class="input-warp">
      密&nbsp;&nbsp;&nbsp;码：
      <input v-model="form.password" type="password" placeholder="请输入密码">
    </div>
    <button class="login" @click="login">登录</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods:{
      login() {
        this.$axios.post('/login',this.form).then(res =>{
          if(res.code == 200){
            alert(res.msg);
            this.$router.push('/layout');
            sessionStorage.setItem('username', this.form.username);
            sessionStorage.setItem('password', this.form.password);
          }else {
            alert(res.msg);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    background-color: skyblue;
    min-height: 100vh;
    text-align: center;
    overflow: hidden;
  }
  h1 {
    font-size: 30px;
    color: red;
    margin: 2rem 0;
  }
  .input-warp {
    font-size: 22px;
    margin: 1rem 0;
  }
  .input-warp input {
    width: 4rem;
    height: .5rem;
    line-height: .5rem;
    border: 1px solid transparent;
    border-radius: 0.1rem;
    padding: 0.1rem;
    outline: none;
  }
  .login {
    width: 5rem;
    line-height: 1rem;
    font-size: 30px;
    background-color: gold;
    color: #fff;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    outline: none;
  }
</style>
