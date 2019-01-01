<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="书籍头图" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="220">
      </el-table-column>
      <el-table-column
        prop="title"
        label="书名"
        width="320">
      </el-table-column>
      <el-table-column
        prop="typeId.title"
        label="类别"
        width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="redact(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="reduce(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        data() {
          return {
            tableData:[]
          }
        },
      methods: {
        getData() {
          this.$axios.get('/admin/book').then(res => {
            this.tableData = res.data
          })
        },
        redact(id) {
          this.$router.push({name: 'redactBook',query: {id}})
        },
        reduce(id) {
          this.$axios.delete(`/admin/book/${id}`).then(res => {
            this.$message.success(res.msg)
            this.getData()
          })
        }
      },
      created(){
          this.getData()
      }
    }
</script>

<style scoped>
  .user-avatar{
    width: 50px;
    height: 50px;
  }
</style>
