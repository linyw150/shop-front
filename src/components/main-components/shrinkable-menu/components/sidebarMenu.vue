<style lang="less">
@import "../styles/menu.less";
</style>
<template>
    <Menu  ref="sideMenu"  width="auto" accordion :theme="menuTheme" @on-select="changeMenu">
          <template v-for="subMenu in menuList">
          <Submenu :name="subMenu.path"  :key="subMenu.id" >
              <template slot="title">
                <Icon type="title" />
                {{subMenu.name}}
              </template>
              <template v-for="childItem in subMenu.children">
                <MenuItem :name="childItem.path" >{{childItem.name}}</MenuItem>
              </template>
          </Submenu>
          </template>
    </Menu>
</template>
<script>
export default {
  name: "sidebarMenu",
  data() {
    return {
      menuTheme: 'dark'
    };
  },
  props: {
    menuList: Array,
  },
  methods: {
    itemTitle (item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    changeMenu(active){
      this.$emit("on-change", active);
    }
  }
};
</script>
