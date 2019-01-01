<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/carousel' }">轮播图列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{book.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="book">
      <img :src="book.img" alt="">
      <h3 class="title">{{book.title}}</h3>
      <p class="author">作者：{{book.author}}</p>
      <p class="desc">简介：{{book.desc}}</p>
      <p class="looknums">有{{book.looknums}}人正在看</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        book: {
          title: '',
          author: '',
          desc: '',
          looknums: '',
        }
      }
    },
    methods: {
      getData() {
        let id = this.$route.query.id
        console.log(id)
        this.$axios.get(`/admin/book/${id}`,id).then( res => {
          console.log(res)
          this.book = res.data
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .book {
    width: 600px;
    padding: 50px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
    text-align: center;
    background-color: #e9e9e9;

    p {
      margin-top: 10px;
    }

    .title {
      color: skyblue;
      margin-top: 10px;
    }

    .author {
      color: #333;
      font-size: 16px;
    }

    .desc {
      color: #555;
      font-size: 12px;
    }

    .looknums {
      color: #888;
      font-size: 14px;
    }
  }
</style>
