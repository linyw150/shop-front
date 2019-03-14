<template>
    <Layout>
      <Sider>
        <div class="logo-con">
            <span>Shop商城</span>
        </div>
        <div class="sidebar-menu-con menu-bar" >
          <shrinkable-menu  :menu-list="menuList">
          </shrinkable-menu>
        </div>
      </Sider>
      <Layout>
        <Header class="main-header-con"style="z-index: 100"><span style="color: red">1234</span></Header>
        <Content :style="{padding: '0 16px 16px'}" >
          <Scroll>
            <router-view :style="{margin: '16px 0'}"></router-view>
          </Scroll>
        </Content>
      </Layout>
    </Layout>
</template>
<script>
  import shrinkableMenu from "../components/main-components/shrinkable-menu/shrinkable-menu.vue";
  export default {
      components: {
        shrinkableMenu,
      },
      data(){
        return{
        }
      },
      computed:{
        menuList() {
          return this.$store.state.app.menuList;
        },
      }

    }
</script>
<style lang="less">
  @import "./main.less";
</style>
