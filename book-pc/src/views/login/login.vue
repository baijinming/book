<template>
    <div>
      <bubbing></bubbing>
      <div class="container">
        <h1>欢迎来到图书后台管理系统</h1>
        <div class="login-box">
          <h2>请登录</h2>
          <el-form class="login-form" status-icon :rules="rule" ref="form" :model="form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" placeholder="请输入密码" @keyup.center.native="login"></el-input>
            </el-form-item>
            <el-button type="primary" class="btn" @click="login" :loading="isLoading">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import bubbing from '../../components/bubbing'
    export default {
      data() {
        var validateUsername = (rule, value, callback) => {
          if(value) {
            callback()
          }else {
            callback(new Error('用户名不能为空'))
          }
        };
        var validatePassword = (rule, value, callback) => {
          if(value && value.length >= 5){
            callback()
          }else {
            callback(new Error('密码不能少于五位'))
          }
        };
        return {
          form: {
            username: '',
            password: ''
          },
          isLoading:false,
          rule: {
            username: [{validator: validateUsername, trigger: 'blur' }],
            password: [{validator: validatePassword, trigger: 'blur' }]
          }
        }
      },
      methods: {
        login() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              var pass = this.form.password
              this.isLoading = true
              this.$axios.post('/login',this.form).then(res => {
                if(res.code == 200){
                  this.$store.commit('UPDATE_INFO', {...res.data, password: pass})
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.push('/layout')
                  },1000)
                }else {
                  this.$message.error('登录失败')
                }
                this.isLoading = false
              })
            } else {
              return false;
            }
          })
        }
      },
      components: {
        bubbing
      }
    }
</script>

<style scoped lang="scss">
  .container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    h1{
      text-align: center;
      color: #fff;
      margin-top: 100px;
      font-weight: 400;
    }

    .login-box{
      width: 400px;
      height: 300px;
      border: 1px solid #f1f1f1;
      border-radius: 6px;
      margin: 15px auto;
      background-color: #fff;
      padding: 40px;

      h2{
        text-align: center;
        color: #333;
        font-weight: 400;
      }

      .login-form{
        margin-top: 10px;

        .btn{
          width: 100%;
        }
      }
    }
  }

</style>
