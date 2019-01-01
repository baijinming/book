<template>
    <div>
      <div class="warp">
        <p>图书名</p>
        <input type="text" v-model="form.title">
      </div>
      <div class="warp">
        <p>作者</p>
        <input type="text" v-model="form.author">
      </div>
      <div class="warp">
        <p>描述</p>
        <input type="text" v-model="form.url">
      </div>
      <div class="redact" @click="redact">
        确认修改
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {}
      }
    },
    methods: {
      getData() {
        this.id = this.$route.query.id;
        this.$axios.get(`/admin/book/${this.id}`).then(res => {
          this.form = res.data
        })
      },
      redact() {
        this.$axios.put('/admin/book',{book_id:this.id, ...this.form}).then(res => {
          if(res.code == 200){
            alert('修改成功')
            this.$router.push('/layout/book')
          }
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .warp {
    margin: 0.4rem;
  }
  .warp p {
    font-size: 20px;
  }
  .warp input {
    border: 1px solid #e9e9e9;
    border-radius: 0.1rem;
    outline: none;
    width: 100%;
    height: 0.8rem;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .redact {
    height: 1rem;
    margin: 0.4rem;
    background-color: skyblue;
    color: #fff;
    font-size: 30px;
    line-height: 1rem;
    text-align: center;
    border-radius: 0.3rem;
  }
</style>
