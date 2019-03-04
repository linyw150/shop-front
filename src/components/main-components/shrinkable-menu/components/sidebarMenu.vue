<style lang="less">
@import "../styles/menu.less";
</style>
<template>
    <Menu  ref="sideMenu"  width="auto" accordion>
          <template v-for="(item,index) in menuList">
          <Submenu name="index"  :key="index" >
              <template slot="title">
                <Icon type="ios-paper" />
                {{item.title}}
              </template>
              <template v-for="childItem in item.children">
                <MenuItem name="childItem.title">{{childItem.title}}</MenuItem>
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
    }
  }
};
</script>
