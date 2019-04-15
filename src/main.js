
import Vue from 'vue'
import App from './App'
console.log('aaa')
import { router } from './router/index'
import axios from 'axios'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import store from './store/index'
import util from '@/libs/util';
import iviewArea from 'iview-area'
import VueI18n from 'vue-i18n';
import { getRequest, postRequest, putRequest, deleteRequest, uploadFileRequest } from '@/libs/axios'
import { setStore, getStore, removeStore } from './libs/storage'
//import hasPermission from './libs/hasPermission';
import { Notice } from 'iview';


/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    mounted() {
    // 初始化菜单
    console.log('aaa')
    util.initRouter(this);
    // 显示打开的页面的列表
    // this.$store.commit('setOpenedList');
    // this.$store.commit('initCachepage');
}
})


Vue.use(VueI18n);
Vue.use(iView);
Vue.use(iviewArea);
Vue.prototype.axios = axios;
//Vue.use(hasPermission);

// 挂载全局使用的方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;
Vue.config.productionTip = false;
Vue.prototype.$Notice = Notice


