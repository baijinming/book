<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form ref="form" :model="form">
        <el-form-item label="书名">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="图书头图">
          <br>
          <el-switch
            v-model="auto"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="上传图片"
            inactive-text="填写图片链接">
          </el-switch>
          <el-input v-if="!auto" v-model="form.img"></el-input>
          <div>
            <imgUpload v-if="auto" v-model="form.img"></imgUpload>
          </div>
        </el-form-item>
        <el-form-item label="图书链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图书分类">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option
              v-for="(item, index) in sorts"
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
            @click="add">添加书籍</el-button>
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
        form:{
          author: '',
          typeId: '',
          img: '',
          url: '',
          title: ''
        },
        sorts: [],
        auto: true
      }
    },
    components: {
      imgUpload
    },
    methods: {
      getData() {
        this.$axios.get('/admin/category',{pn: this.pn, size:100}).then(res => {
          this.sorts = res.data
        })
      },
      add() {
        this.$axios.post('/admin/book',this.form).then(res => {
          if(res.code == 200){
            this.$message.success('添加成功')
            this.$router.push('/layout/books')
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
