<template>
  <div style="width: 100%">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.header" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="320">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="个性签名"
        width="400">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="250">
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
      data () {
        return {
          tableData: [],
          count: 0,
          pn: 1
        }
      },
      methods: {
        getData () {
          this.$axios.get('/admin/user',{pn: this.pn, size:5}).then(res=>{
            this.tableData = res.data
            this.count = res.count
          })
        },
        reduce(id) {
          this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.post('/user/delete',{userIds:[id]}).then(res => {
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
        redact(info) {
          // this.$router.push(`/layout/editAdmin?info=${info}`)
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
      created () {
        this.getData()
      }
    }
</script>

<style scoped>
  .user-avatar {
    width: 80px;
    height: 80px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
