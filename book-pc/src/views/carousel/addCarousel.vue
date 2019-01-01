<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片">
          <imgUpload v-model="form.img"></imgUpload>
        </el-form-item>
        <el-form-item label="对应书籍">
          <el-select v-model="sortId" placeholder="请先选择分类" @change="toBooks">
            <el-option
              v-for="(item, index) in sorts"
              :key="index"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
          <div v-if="form.book" class="book">
            <img :src="book.img" >
            <div class="text">
              <p class="title">{{book.title}}</p>
              <p class="author">{{book.author}}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="序号">
          <el-input-number v-model="form.index"  :min="1" :max="998" ></el-input-number>
        </el-form-item>
        <el-form-item >
          <el-button
            size="mini"
            type="primary"
            @click="add">添加轮播图</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog
      title="请选择书籍"
      :visible.sync="isAddBook"
      width="50%"
      center>
      <el-table
        :data="books"
        class="table">
        <el-table-column label="书籍头图" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="user-avatar">
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          width="220">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureBook(scope.row._id)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next" prev-text="上一页" next-text="下一页"
                     :total="bookCount" :page-size="3"
                     @current-change="changePage" @next-click="nextPage" @prev-click="lastPage">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="popup" v-if="isAddBook">

    </div>
  </div>
</template>

<script>
  import imgUpload from '../../components/img-upload'
  export default {
    data() {
      return {
        form:{
          title: '',
          img: '',
          book: '',
          index: 1
        },
        books: [],
        sorts: [],
        sortId: '',
        isAddBook: false,
        book: {},
        bookCount: 0,
        pn: 1
      }
    },
    components: {
      imgUpload
    },
    methods: {
      getData() {
        this.$axios.get('/admin/category').then(res => {
          this.sorts = res.data
        })
      },
      add() {
        this.$axios.post('/admin/swiper',this.form).then(res => {
          if(res.code == 200){
            this.$message.success('添加成功')
            setTimeout(() => {
              this.$router.push('/layout/carousel')
            },1000)
          }
        })
      },
      toBooks() {
        this.$axios.get(`/admin/category/${this.sortId}`,{pn: this.pn, size: 3}).then(res => {
          this.books = res.data.books
          this.bookCount = res.count
        })
        this.isAddBook = true
        console.log('111')
      },
      sureBook(id) {
        this.form.book = id
        this.isAddBook = false
        this.book = this.books.filter(item => item._id == id)[0]
      },
      changePage(page) {
        this.pn = page
        this.toBooks()
      },
      nextPage() {
        this.pn++
        this.toBooks()
      },
      lastPage() {
        this.pn--
        this.toBooks()
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .main{
    width: 500px;
    margin-top: 50px;
    margin-left: 50px;
  }

  img {
    width: 60px;
    height: 60px;
  }

  .book {
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    display: flex;

    img {
      width: 80px;
      height: 100px;
    }

    .text {
      padding: 10px;
      line-height: 20px;

      .title {
        font-size: 16px;
        color: #333;
        font-weight: 700;
      }

      .author {
        font-size: 14px;
        color: #444;
        margin-top: 10px;
      }
    }
  }

  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
