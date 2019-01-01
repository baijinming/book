<template>
    <div class="container">
      <div class="header">
        <h1 class="title">图书后台管理系统</h1>
        <div class="loginout" @click="exitLogin">退出登录</div>
      </div>
      <div class="nav">
        <div class="via">
          <img :src="imgUrl" alt="" class="icon">
          <div class="text">
            <p>{{nickname}}</p>
            <p>欢迎您</p>
          </div>
        </div>
        <el-menu :router="true" background-color="#545c64" text-color="#fff" active-text-color="#409eff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <template slot="title">个人中心</template>
              <el-menu-item index="/layout/editUser">修改个人信息</el-menu-item>
              <el-menu-item index="/layout/changePass">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员</span>
            </template>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/layout/admin">管理员列表</el-menu-item>
              <el-menu-item index="/layout/addAdmin">添加管理员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分类管理</template>
              <el-menu-item index="/layout/sort">分类列表</el-menu-item>
              <el-menu-item index="/layout/addSort">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">图书管理</template>
              <el-menu-item index="/layout/books">图书列表</el-menu-item>
              <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>轮播图管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">轮播图管理</template>
              <el-menu-item index="/layout/carousel">轮播图列表</el-menu-item>
              <el-menu-item index="/layout/addCarousel">添加轮播图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="mian-counter">
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          imgUrl: '',
          nickname: ''
        }
      },
      methods: {
        exitLogin() {
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.get('/admin/logout').then(res => {
              if(res.code == 200) {
                this.$message.success('已退出登录')
                this.$store.commit('UPDATE_INFO', {})
                this.$router.push('/login')
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        }
      },
      created() {
        this.imgUrl = this.$store.state.userInfo.header
        this.nickname = this.$store.state.userInfo.nickname
      }
    }
</script>

<style scoped lang="scss">
  .container {
    height: 100vh;
    overflow: auto;

    .header {
      margin-left: 200px;
      height: 60px;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      position: relative;

      .title {
        font-weight: 400;
        line-height: 60px;
        text-align: center;
        color: #333;
        width: 100%;
      }

      .loginout {
        position: absolute;
        right: 40px;
        color: gold;
        line-height: 60px;
        cursor: pointer;
      }
    }

    .nav {
      width: 200px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: #545c64;

      .via {
        padding: 20px;
        display: flex;
        text-align: center;

        .icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
        }

        .text {
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 80px;
          font-size: 12px;
          color: #fff;
        }
      }

      .el-menu {
        border-right: 1px solid #545c64;
      }
    }

    .mian-counter{
      margin-left: 200px;
      padding: 20px 40px;
    }
  }
</style>
