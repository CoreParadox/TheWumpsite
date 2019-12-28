import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Resources from './views/Resources.vue';
import publicResources from './views/PublicResources.vue';
import Profile from './views/Profile.vue';
import Users from './views/Users.vue';
import User from './views/User.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/resources',
      name: 'resources',
      component: Resources,
    },
    {
      path: '/publicResources',
      name: 'publicResources',
      component: publicResources,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],

});
