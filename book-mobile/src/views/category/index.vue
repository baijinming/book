<template>
  <div class="container">
    <h1>分类列表</h1>
    <div class="item-container" v-for="item in tableData">
      <div style="display: flex;flex-direction: column;justify-content: space-between;width: 3rem;">
        <p class="book-title">{{item.title}}</p>
        <p>其中包含{{item.books.length}}本图书</p>
      </div>
      <img class="book-img" :src="item.icon" alt="">
      <div style="flex: 1;">
        <div class="redact" @click="redact(item._id)">修改分类信息</div>
      </div>
    </div>
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
        this.$axios.get('/admin/category').then(res => {
          this.tableData = res.data
        })
      },
      redact(id) {
        this.$router.push({name: 'redactCategory',query: {id}})
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped>
  .container {
    background-color: #e9e9e9;
  }
  h1 {
    text-align: center;
    color: #333;
    font-size: 30px;
    margin: 0.2rem;
  }
  .item-container {
    display: flex;
    background-color: #fff;
    margin: 0.4rem;
    font-size: 14px;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .book-img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
  }
  .book-title {
    font-size: 18px;
    color: skyblue;
  }
  .redact {
    background-color: skyblue;
    color: #fff;
    width: 2rem;
    height: 0.8rem;
    margin: 0.1rem 0;
    border-radius: 0.1rem;
    line-height: 0.8rem;
    text-align: center;
    float: right;
  }
</style>
