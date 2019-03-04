<template>
<div>

  <Row>
    <Menu accordion :open-names="singleOpenName">
      <template  v-for="item in menuList.result">
        <Submenu :name="item.id">
          <template slot="title">
            <Icon type="ios-paper" />
            {{item.title}}{{item.id}}
          </template>
          <MenuItem name="1-1">文章管理</MenuItem>
        </Submenu>
      </template>
    </Menu>
  </Row>
</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      singleOpenName:['4'],
      menuList:{
        "result": [
          {
            "id": "1",
            "title": "系统管理",
            "level": "1",
            "parentId": "0",
            "children": [
              {
                "id": "2",
                "title": "地区管理",
                "level": "2",
                "parentId": "1",
                "children": [
                  {
                    "id": "9",
                    "title": "中国地区管理",
                    "level": "3",
                    "parentId": "2",
                    "children": []
                  },
                  {
                    "id": "10",
                    "title": "其他地区管理",
                    "level": "3",
                    "parentId": "2",
                    "children": []
                  }
                ]
              },
              {
                "id": "3",
                "title": "客服电话",
                "level": "2",
                "parentId": "1",
                "children": []
              }
            ]
          },
          {
            "id": "4",
            "title": "品牌管理",
            "level": "1",
            "parentId": "0",
            "children": [
              {
                "id": "5",
                "title": "品牌列表",
                "level": "2",
                "parentId": "4",
                "children": []
              }
            ]
          },
          {
            "id": "6",
            "title": "商家管理",
            "level": "1",
            "parentId": "0",
            "children": [
              {
                "id": "7",
                "title": "商家列表",
                "level": "2",
                "parentId": "6",
                "children": []
              },
              {
                "id": "8",
                "title": "商家类型",
                "level": "2",
                "parentId": "6",
                "children": []
              }
            ]
          }
        ],
        "errMsg": "执行成功",
        "errorCode": 0
      }
    }
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
