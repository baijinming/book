<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form ref="form" :model="form">
        <el-form-item label="用户头像">
          <imgUpload v-model="form.header"></imgUpload>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button
            size="mini"
            type="primary"
            @click="redact">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import imgUpload from '../../components/img-upload'
    export default {
      data() {
        return {
          form: {}
        }
      },
      methods: {
        redact() {
          this.$axios.put('/admin/user', this.form).then(res => {
            this.$store.commit('UPDATE_INFO',this.form)
            this.$message.success('修改成功')
            this.$router.go(0)
          })
        }
      },
      components: {
        imgUpload
      },
      created() {
        this.form = this.$store.state.userInfo
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
