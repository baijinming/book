<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item label="旧密码" prop="pass">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="form.newPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="form.checkPass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateOldPass = (rule, value, callback) => {
        if(value == this.oldPassword){
          callback()
        }else {
          callback(new Error('密码输入错误'))
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value && value.length >=5) {
          callback();
        } else {
          callback(new Error('密码不能少于五位'));
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if(value == this.form.newPass){
          callback()
        }else {
          callback(new Error('两次输入密码不一致'))
        }
      }
      return {
        oldPassword: '',
        form: {
          pass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          pass: [{ validator: validateOldPass, trigger: 'blur' }],
          newPass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{validator: validateCheckPass, trigger: 'blur'}]
        }
      };
    },
    methods: {
      edit() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$store.commit('EDIT_PASSWORD', this.form.newPass)
              let params = {
                password: this.form.pass,
                new_password: this.form.newPass
              }
              this.$axios.put('/admin/password', params).then(res => {
                this.$message.success('修改密码成功')
                this.$router.push('/layout')
              })
            } else {
              return false;
            }
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.oldPassword = this.$store.state.userInfo.password
    }
  }
</script>

<style scoped>
  .main{
    width: 500px;
    margin-top: 50px;
    margin-left: 50px;
  }
</style>
