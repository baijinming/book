<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="轮播图" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="350">
      </el-table-column>
      <el-table-column
        prop="index"
        label="排序"
        width="220">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="look(scope.row.book._id)">查看图书</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toRedact(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="reduce(scope.row._id)">删除</el-button>
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
        this.$axios.get('/admin/swiper',{pn: this.pn, size: 5}).then(res => {
          this.tableData = res.data
          this.count = res.count
        })
      },
      look(id) {
        this.$router.push(`/layout/oneBook?id=${id}`)
      },
      toRedact(id) {
        this.$router.push(`/layout/redactCarousel?id=${id}`)
      },
      reduce(id) {
        this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.post('/admin/swiper/delete',{ids: [id]}).then(res => {
            if(res.code == 200){
              this.$message.success('删除成功')
              this.getData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .user-avatar {
    width: 80px;
    height: 80px;
  }

  /deep/{
    .el-pagination{
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
