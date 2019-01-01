<template>
  <div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="info.username" :readonly="readOnly"></mt-field>
    <mt-field label="昵称" placeholder="请输入昵称" v-model="info.nickname" :readonly="readOnly"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="info.email" :readonly="readOnly"></mt-field>
    <mt-field label="自我介绍" placeholder="请输入自我描述" type="text" v-model="info.desc" :readonly="readOnly"></mt-field>
    <div class="buttons">
      <mt-button type="primary" @click="editUser()" class="btn" v-if="readOnly">修改用户信息</mt-button>
      <mt-button type="default" @click="notSave()" class="btn" v-if="!readOnly" >取消</mt-button>
      <mt-button type="primary" @click="sureEdit()" class="btn" v-if="!readOnly">确认修改用户信息</mt-button>
      <mt-button type="danger" @click="editPass()" class="btn" v-if="!ifEditPass">修改密码</mt-button>
    </div>
    <div v-show="ifEditPass">
      <mt-field label="旧密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入密码" type="password" v-model="new_password"></mt-field>
      <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="new_password2"></mt-field>
      <div class="buttons">
        <mt-button type="default" class="btn" @click="notSavePass()">取消</mt-button>
        <mt-button type="primary" class="btn bottom" @click="savePass()">确认修改密码</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return{
      info: {
        username: '',
        nickname: '',
        email: '',
        desc: '',
      },
      password: '',
      new_password: '',
      new_password2: '',
      readOnly: true,
      ifEditPass: false,
      form: {}
    }
  },
  methods: {
    getData() {
      this.form.username = sessionStorage.getItem('username');
      this.form.password = sessionStorage.getItem('password');
      this.$axios.post('/login',this.form).then(res => {
        if(res.code == 200){
          this.info = res.data
        }else {
          alert('登录失败')
        }
      })
    },
    editUser () {
      this.$data.readOnly = false
      Toast({
        message: '请开始修改信息',
        duration: 2000
      })
    },
    sureEdit() {
      this.$axios.put('/admin/user', this.info).then(res => {
        alert('修改成功')
        this.$router.go(0)
      })
    },
    notSave () {
      this.$data.readOnly = !this.$data.readOnly
    },
    editPass () {
      this.$data.ifEditPass = true
    },
    notSavePass () {
      this.$data.password = ''
      this.$data.new_password = ''
      this.$data.new_password2 = ''
      this.$data.ifEditPass = false
    },
    savePass () {
      if(this.$data.password != this.form.password){
        Toast({
          message: '旧密码不对',
          duration: 5000
        });
        return
      }
      if(this.$data.password === ''){
        Toast({
          message: '密码不得为空',
          duration: 5000
        });
        return
      } else if (this.$data.new_password === ''){
        Toast({
          message: '新密码不得为空',
          duration: 5000
        });
        return
      } else if (this.$data.new_password2 !== this.$data.new_password){
        Toast({
          message: '请确认两次密码',
          duration: 5000
        });
        return
      }
      this.$data.ifEditPass = false;
      let params = {
        password: this.password,
        new_password: this.new_password
      };
      this.$axios.put('/admin/password', params).then(res => {
        alert('修改密码成功')
        this.$router.go(0)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
  .buttons{
    width: 50%;
    margin: 10px auto;
  }
  .btn{
    width: 100%;
    display: inline;
  }
  .bottom{
    margin-bottom: 60px;
  }
  .notShow{
    display: none;
  }
</style>
