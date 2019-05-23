import Vue from "vue";
import Router from "vue-router";

// 懒加载组件
const Login = () => import("./views/login_admin/index");
const Register = () => import("./views/register_admin/index");
const AdminHomePage = () => import("./views/admin_homePage/index");
const AddInfo = () => import("./views/add_info/index");
const EditInfo = () => import("./views/edit_info/index");
// import Login from "./views/login_admin/index";
// import Register from "./views/register_admin/index";
// import AdminHomePage from "./views/admin_homePage/index";
// import AddInfo from "./views/add_info/index";
// import EditInfo from "./views/edit_info/index";

Vue.use(Router);

const routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: "/homepage",
      name: "AdminHomePage",
      component: AdminHomePage,
      meta: {
        requireAuth: true
      }
      // children: [
      //   {
      //   	path: 'addNew',
      // 	  name: "AddInfo",
      // 	  component: AddInfo
      //   }
      // ]
    },
    {
      path: "/addNew",
      name: "AddInfo",
      component: AddInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/editInfo",
      name: "EditInfo",
      component: EditInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        requireAuth: true
      }  
    }
  ]
});

routers.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 当前组件需要登录权限
    if (localStorage.getItem('token')) { // 有权限
      if(to.path === '/login'){
        //登录状态下 访问login.vue页面 会跳到homepage.vue
        next({path: '/homepage'});
      }else{
        next();
      }
    } else { // 没有权限 ,访问任何页面。都会进入到 登录页
      console.log('进入1')
      if (to.path === '/login') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
        console.log('进入2')
        next();
      } else { // 否则 跳转到登录页面
        console.log('进入3')
        next({ path: '/' });
      }
    }
  } else { // 不需要
    next()
  }
})

export default routers
