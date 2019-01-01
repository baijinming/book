<template>
    <div class="layout-container">
      <div class="header">图书管理系统</div>
      <div style="height: 1rem"></div>
      <router-view/>
      <div class="table-bar">
        <p :class="index == 1 ? 'selected' : ''" @click="swt(1)">图书管理</p>
        <p :class="index == 2 ? 'selected' : ''" @click="swt(2)">分类管理</p>
        <p :class="index == 3 ? 'selected' : ''" @click="swt(3)">个人信息</p>
      </div>
      <div style="height: 1rem"></div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        index: '1'
      }
    },
    methods: {
      swt(x) {
        this.index = x;
        if(x == '1') {
          this.$router.push('/layout/book')
        }else if (x == '2'){
          this.$router.push('/layout/category')
        } else {
          this.$router.push('/layout/user')
        }
      }
    }
  }
</script>

<style scoped>
  .layout-container {
    background-color: #e9e9e9;
    min-height: 100vh;
  }
  .header {
    color: #fff;
    background-color: skyblue;
    text-align: center;
    font-size: 30px;
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .table-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    display: flex;
    font-size: 20px;
    background-color: #999;
  }
  .table-bar p {
    width: 2.5rem;
    line-height: 1rem;
    text-align: center;
  }
  .selected {
    color: red;
  }

</style>
