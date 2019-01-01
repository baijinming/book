<template>
  <div>
    <h1>目前共有<span>{{all}}</span>本图书</h1>
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data () {
      this.chartSettings = {

      };
      return {
        all: '',
        categories: []
      }
    },
    methods: {
      getDate() {
        this.$axios.get('/all').then(res => {
          this.all = res.bookCount
          this.categories = res.data
          console.log(res.data)
        })
      }
    },
    computed: {
      chartData() {
        let rows = [];
        for (let i = 0; i < this.categories.length; i++){
          let obj = {
            '分类': this.categories[i].title,
            '图书数量': this.categories[i].books.length
          }
          rows.push(obj)
        }
        return {
          columns: ['分类', '图书数量'],
          rows
        }
      }
    },
    created(){
      this.getDate()
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
    line-height: 2;
    color: skyblue;
    margin-bottom: 20px;
  }
</style>
