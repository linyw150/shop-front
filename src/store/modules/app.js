import { otherRouter } from '@/router/router';
import { router } from '@/router/index';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        // 面包屑数组
        menuList: [],
        routers: [
            otherRouter
        ]
    },
    mutations: {
        updateMenulist(state, routes) {
            state.menuList = routes;
            console.log(state.menuList);
        }
    }
};

export default app;
