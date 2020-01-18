import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Resources from './views/Resources.vue';
import publicResources from './views/PublicResources.vue';
import Profile from './views/Profile.vue';
import Users from './views/Users.vue';
import User from './views/User.vue';
import Apply from './views/Apply.vue';
import Events from './views/Events.vue';
import Rules from './views/Rules.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
      path: '/apply',
      name: 'apply',
      component: Apply,
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
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
