<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/carousel' }">轮播图列表</el-breadcrumb-item>
      <el-breadcrumb-item>修改轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form ref="form" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <imgUpload v-model="form.img"></imgUpload>
        </el-form-item>
        <el-form-item label="对应书籍">
          <el-dropdown trigger="click" size="mini">
            <span class="el-dropdown-link">
              {{bookTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div v-for="item in books" :key="item._id" @click="lock(item._id, item.title)">
                <el-dropdown-item>{{item.title}}</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label="排序">
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
  import imgUpload from '../../components/img-upload'
  export default {
    data() {
      return {
        form: {
          title: '',
          img: '',
          index: '',
          book: {}
        },
        id: '',
        books: []
      }
    },
    methods: {
      getData() {
        this.id = this.$route.query.id
        this.$axios.get(`/admin/swiper/${this.id}`).then(res => {
          this.form = res.data
        })
        this.$axios.get('/admin/book').then(res => {
          this.books = res.data
        })
      },
      redact() {
        let newMessage = {
          title: this.form.title,
          img: this.form.img,
          index: this.form.index,
          book: this.form.book._id
        }
        this.$axios.put(`/admin/swiper/${this.id}`, newMessage).then(res => {
          if(res.code == 200) {
            this.$message.success('修改成功')
            this.$router.push('/layout/carousel')
          }
        })
      },
      lock(bookId, title) {
        this.form.book._id = bookId
        this.form.book.title = title
      },
    },
    components: {
      imgUpload
    },
    computed: {
      bookTitle() {
        return this.form.book.title
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
