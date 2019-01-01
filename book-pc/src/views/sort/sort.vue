<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="分类名"
        width="220">
      </el-table-column>
      <el-table-column label="分类头图">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="index"
        label="分类排序"
        width="320">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="lookBooks(scope.row._id)">书籍</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRedact(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="reduce(scope.row._id)">删除分类</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" prev-text="上一页" next-text="下一页"
                   :total="count" :page-size="5"
                   @current-change="changePage" @next-click="nextPage" @prev-click="lastPage">
    </el-pagination>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData:[],
          count: 0,
          pn: 1
        }
      },
      methods: {
        getData() {
          this.$axios.get('/admin/category',{pn: this.pn, size:5}).then(res => {
            this.count = res.count
            this.tableData = res.data
            console.log(res.data)
          })
        },
        changePage(page) {
          this.pn = page
          this.getData()
        },
        nextPage() {
          this.pn++
          this.getData()
        },
        lastPage() {
          this.pn--
          this.getData()
        },
        lookBooks(id) {
          this.$router.push(`/layout/oneSort?id=${id}`)
        },
        toRedact(id) {
          this.$router.push({name: 'redactSort',query: {id}})
        },
        reduce(id) {
          this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.delete(`/admin/category/${id}`).then(res => {
              this.$message.success('删除成功')
              this.getData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      created() {
        this.getData()
      }
    }
</script>

<style scoped>
  .user-avatar {
    width: 100px;
    height: 100px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
