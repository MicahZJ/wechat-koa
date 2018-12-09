import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login_admin/index";
import AdminHomePage from './views/admin_homePage/index'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
	  {
		  path: "/homepage",
		  name: "AdminHomePage",
		  component: AdminHomePage
	  },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    // {
    //   path: "/login",
    //   name: "Login",
    //   component: Login
    // }
  ]
});
