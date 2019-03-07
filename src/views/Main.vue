<template>
  <Layout>
    <Layout>
      <Sider>
        <div class="sidebar-menu-con menu-bar" >
          <shrinkable-menu  :menu-list="menuList">
          </shrinkable-menu>
        </div>
      </Sider>
      <Layout>
        <router-view></router-view>
      </Layout>
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
