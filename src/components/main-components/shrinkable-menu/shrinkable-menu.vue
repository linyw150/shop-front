<style lang="less">
    @import './styles/menu.less';
</style>

<template>
    <div>
      <div>
          <sidebar-menu
              :menu-list="menuList"
              @on-change="handleChange"
          ></sidebar-menu>
      </div>
    </div>
</template>

<script>
import sidebarMenu from './components/sidebarMenu.vue';
//import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '@/libs/util';
export default {
    name: 'shrinkableMenu',
    components: {
        sidebarMenu,
    },
    props: {
        menuList: {
            type: Array,
            required: true
        }
    },
    methods: {
      handleChange(path){
        this.$router.push({
          name:path
        })
      }

    }
};
</script>
