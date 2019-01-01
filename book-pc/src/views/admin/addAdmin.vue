<template>
  <div>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="main">
    <el-form status-icon ref="form" :model="form" :rules="rule">
      <el-form-item label="头像">
        <imgUpload v-model="form.header"></imgUpload>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="form.checkPass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button
          size="mini"
          type="primary"
          @click="redact">添加管理员</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
  import imgUpload from '../../components/img-upload'
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
      var validateCheckPass = (rule, value, callback) => {
        if(value == this.form.password){
          callback()
        }else {
          callback(new Error('两次输入密码不一致'))
        }
      }
      return {
        form:{
          username: '',
          password: '',
          email: '',
          nickname: '',
          header: '',
          checkPass: ''
        },
        rule:{
          username: [{validator: validateUsername, trigger: 'blur' }],
          password: [{validator: validatePassword, trigger: 'blur' }],
          checkPass: [{validator: validateCheckPass, trigger: 'blur'}]
        }
      }
    },
    components: {
      imgUpload
    },
    methods: {
      redact() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$axios.post('/user',this.form).then(res => {
              if(res.code == 200){
                this.$message.success('添加成功')
                setTimeout(() => {
                  this.$router.push('/layout/admin')
                },1000)
              }
            })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .main{
    width: 500px;
    margin-top: 50px;
    margin-left: 50px;
  }
  .pwd{
    color: #ea2000;
    display: inline-block;
  }
</style>
