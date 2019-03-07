<template>
<div>
  <Table border ref="selection" :columns="columns" :data="brandData"></Table>
</div>

</template>

<script>
  import { getBrandList } from '@/api/index';
  import axios from 'axios';
  export default {
  data () {
    return {
      brandData: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '品牌名',
          key: 'name'
        },
        {
          title: '图片',
          key: 'pictureUrl'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '备注',
          key: 'desc'
        }
      ],
    }
  },
    methods:{
      initData(){
        axios.get(getBrandList).then(res => {
          console.log(typeof(res.result))
          let data = res.result;
          console.log(data);
          this.brandData = data;
         });
      }
    },
    mounted(){
      this.initData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
