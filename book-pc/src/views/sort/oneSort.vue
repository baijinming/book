<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/sort' }">分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button style="float: right"
      size="mini"
      type="primary"
      @click="toggleAdd">添加书籍</el-button>
    <div v-if="isAdd" style="position: relative" class="addbook">
      <div class="themain">
        <el-select v-model="bookid" placeholder="请选择">
          <el-option
            v-for="(item, index) in books"
            :key="index"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
        <div class="btns">
          <el-button
            size="mini"
            type="primary"
            @click="addBook">添加</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toggleAdd">取消</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="书籍头图" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="书名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        width="350">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="redact(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[],
        title: '',
        id: '',
        bookid: '',
        books: [],
        isAdd: false
      }
    },
    methods: {
      getData() {
        this.id = this.$route.query.id
        this.$axios.get(`/admin/category/${this.id}`).then(res => {
          this.title = res.data.title
          this.tableData = res.data.books
        })
      },
      redact(id) {
        this.$router.push({name: 'redactBook',query: {id}})
      },
      toggleAdd() {
        this.isAdd = !this.isAdd
      },
      addBook() {
        if(this.bookid == ''){
          this.$message.error('请选择添加书籍')
        }else {
          this.$axios.post(`/category/${this.id}/book/${this.bookid}`,{id: this.id, bookid: this.bookid}).then(res => {
            if(res.code == 200){
              this.$message.success(res.msg)
              this.isAdd = false
              this.getData()
            }
          })
        }
      }
    },
    created(){
      this.getData()
      this.$axios.get('/admin/book').then(res => {
        this.books = res.data
      })
    }
  }
</script>

<style scoped lang="scss">
  .user-avatar {
    width: 50px;
    height: 50px;
  }

 /deep/{
   .addbook {
     float: right;
     top: 60px;
     right: 120px;
     z-index: 998;

     .themain {
       width: 200px;
       height: 100px;
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       background-color: #f1f1f1;
       display: flex;
       justify-content: space-between;
       flex-direction: column;
       padding:15px 10px;
       border-radius: 10px;

       .btns {
         display: flex;
         justify-content: space-between;
         padding: 0 10px;
       }
     }
   }
 }
</style>
