<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/books' }">图书列表</el-breadcrumb-item>
      <el-breadcrumb-item>修改图书</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form ref="form" :model="form">
        <el-form-item label="书籍名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="图书头图">
          <imgUpload v-model="form.img"></imgUpload>
        </el-form-item>
        <el-form-item label="书籍简介">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="图书分类">
          <el-select v-model="form.typeId._id" placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
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
          form:{
            typeId: {
              _id: ''
            }
          },
          id:"",
          options:[]
        }
      },
      components: {
        imgUpload
      },
      methods: {
        getData() {
          this.id = this.$route.query.id;
          this.$axios.get(`/admin/book/${this.id}`).then(res => {
            this.form = res.data
          })
          this.$axios.get('/admin/category').then(res => {
            this.options = res.data
          })
        },
        redact() {
          this.$axios.put('/admin/book',{book_id:this.id, ...this.form}).then(res => {
            if(res.code == 200){
              this.$message.success('修改成功')
              setTimeout(() => {
                this.$router.push('/layout/books')
              },1000)
            }
          })
        }
      },
      created() {
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
</style>
