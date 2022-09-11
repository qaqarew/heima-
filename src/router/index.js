import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Layout"),
    //2.2重定项 redirect:跳转到首页
    redirect: '/ ',
    //2.1配置二级路由
    children: [{ 
      path: "/ " ,
      component:()=> import('@/views/Home')
    },
    { 
      path: "/video" ,
      component:()=> import('@/views/Video')
    },
    { 
      path: "/qa" ,
      component:()=> import('@/views/QA')
    },
    { 
      path: "/profile" ,
      component:()=> import('@/views/My')
    }
  ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
