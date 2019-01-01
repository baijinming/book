<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/sort' }">分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form ref="form" :model="form">
        <el-form-item label="分类名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <imgUpload v-model="form.icon"></imgUpload>
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input-number v-model="form.index"  :min="1" :max="998" ></el-input-number>
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
  import imgUpload from "../../components/img-upload"
    export default {
      data() {
        return {
          form:{},
          id:""
        }
      },
      components: {
        imgUpload
      },
      methods: {
        getData() {
          this.id = this.$route.query.id;
          this.$axios.get(`/admin/category/${this.id}`).then(res => {
            this.form = res.data
          })
        },
        redact() {
          this.$axios.put(`/admin/category`,{
            _id: this.id,
            title: this.form.title,
            icon: this.form.icon,
            index: this.form.index
          }).then(res => {
            this.$message.success('修改成功')
            setTimeout(() => {
              this.$router.push('/layout/sort')
            },1000)
          })
        }
      },
      created (){
          this.getData()
      }
    }
</script>

<style scoped>
  .main{
    width: 500px;
    margin-top: 50px;
    margin-left: 50px;
  }
  img{
    width: 100px;
    height: 100px;
  }
</style>
