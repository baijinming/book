<template>
  <div class="container">
    <h1>书籍列表</h1>
     <div class="item-container" v-for="book in tableData">
       <img class="book-img" :src="book.img" alt="">
       <div style="display: flex;flex-direction: column;justify-content: space-around">
         <p class="book-title">{{book.title}}</p>
         <p class="book-author">作者：{{book.author}}</p>
       </div>
       <div style="flex: 1;">
         <div class="redact" @click="redact(book._id)">修改图书信息</div>
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
        this.$axios.get('/admin/book').then(res => {
          this.tableData = res.data
        })
      },
      redact(id) {
        this.$router.push({name: 'redactBook',query: {id}})
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
  .book-author {
    color: #666;
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
