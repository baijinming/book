<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form ref="form" :model="form">
        <el-form-item label="分类名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <imgUpload v-model="form.icon"></imgUpload>
        </el-form-item>
        <el-form-item >
          <el-button
            size="mini"
            type="primary"
            @click="redact">添加分类</el-button>
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
        form:{}
      }
    },
    components: {
      imgUpload
    },
    methods: {
      redact() {
        this.$axios.post('/admin/category',this.form).then(res => {
          if(res.code == 200){
            this.$message.success('添加成功')
            setTimeout(() => {
              this.$router.push('/layout/sort')
            },1000)
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
</style>
