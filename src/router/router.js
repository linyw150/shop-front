import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import test from '@/components/test'

Vue.use(Router)

export const otherRouter = {
  path: '/home',
  name: 'otherRouter',
  component: Main,
};

export const testRouter = {
  path: '/test',
  name: 'testRouter',
  component: test,
};
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    otherRouter,
   testRouter
];
