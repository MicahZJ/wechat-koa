import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login_admin/index";
import Register from "./views/register_admin/index";
import AdminHomePage from './views/admin_homePage/index';
import AddInfo from './views/add_info/index';
import EditInfo from './views/edit_info/index';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: '/login',
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
	  {
		  path: "/homepage",
		  name: "AdminHomePage",
		  component: AdminHomePage,
		  // children: [
			//   {
			//   	path: 'addNew',
			// 	  name: "AddInfo",
			// 	  component: AddInfo
			//   }
		  // ]
	  },
	  {
		  path: '/addNew',
		  name: "AddInfo",
		  component: AddInfo
	  },
    {
      path: '/editInfo',
      name: "EditInfo",
      component: EditInfo
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
