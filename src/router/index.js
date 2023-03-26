import Vue from "vue";
import VueRouter from "vue-router";
// import layout from "../views/layout";

//处理重复跳转报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => {})
}
//运用实例
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name:"home",
    meta: {
      title: "UNMS",
    },
    component: () => import("@/views/tokenIndex"),
  },
  {
    path: "/AnnounCement",
    name:"AnnounCement",
    meta: {
      title: "公告",
    },
    component: () => import("@/views/announcement"),
  },
  {
    path: "/aboutPage",
    name:"aboutPage",
    meta: {
      title: "关于",
    },
    component: () => import("@/views/aboutPage"),
  },
  {
    path: "/myUnms",
    name:"myUnms",
    meta: {
      title: "我的NUMS",
    },
    component: () => import("@/views/myUnms"),
  },
  {
    path: "/onSale",
    name:"onSale",
    meta: {
      title: "在售NUMS",
    },
    component: () => import("@/views/onSale"),
  },
  {
    path: "/transductive",
    name:"transductive",
    meta: {
      title: "直推列表",
    },
    component: () => import("@/views/transductive"),
  },
  {
    path: "/invite",
    name:"invite",
    meta: {
      title: "我的邀请",
    },
    component: () => import("@/views/invite"),
  }
  //
  // {
  //   path: "/tokenIndexNext",
  //   meta: {
  //     title: "详情",
  //   },
  //   component: () => import("@/views/tokenIndexNext"),
  // },
  // {
  //   path: "/tokenIndexEnd",
  //   meta: {
  //     title: "详情",
  //   },
  //   component: () => import("@/views/tokenIndexNext"),
  // }
];
// yuanUniverse
const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
