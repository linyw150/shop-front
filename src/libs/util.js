import axios from 'axios';
import { getMenuList } from '@/api/index';
import router from '@/router/index';
import Cookies from "js-cookie";

let util = {

};





util.initRouter = function (vm) {
    const constRoutes = [];
    const otherRoutes = [];
    console.log('aaa')
    // 404路由需要和动态路由一起注入


    // 判断用户是否登录
    // let userInfo = Cookies.get('userInfo')
    // if (userInfo === null || userInfo === "" || userInfo === undefined) {
    //     // 未登录
    //     return;
    // }
    // let accessToken = window.localStorage.getItem('accessToken')
    // 加载菜单
   // axios.get(getMenuList, {headers: {'accessToken': accessToken}}).then(res => {
    axios.get(getMenuList).then(res => {
        let menuData = res.result;
        if (menuData === null || menuData === "" || menuData === undefined) {
            return;
        }
        // util.initRouterNode(constRoutes, menuData);
        // util.initRouterNode(otherRoutes, otherRouter);

        // 刷新界面菜单
        vm.$store.commit('updateMenulist',menuData);
    });
};
util.initRouterNode = function (routers, data) {
  for (var item of data) {
    let menu = Object.assign({}, item);
    // menu.component = import(`@/views/${menu.component}.vue`);
    menu.component = lazyLoading(menu.component);

    if (item.children && item.children.length > 0) {
      menu.children = [];
      util.initRouterNode(menu.children, item.children);
    }

    let meta = {};
    // 给页面添加权限、标题、第三方网页链接
    meta.permTypes = menu.permTypes ? menu.permTypes : null;
    meta.title = menu.title ? menu.title + " - X-Boot前后端分离开发平台 By: Exrick" : null;
    meta.url = menu.url ? menu.url : null;
    menu.meta = meta;

    routers.push(menu);
  }
};

export default util;
