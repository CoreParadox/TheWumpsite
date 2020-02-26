<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp;
      <router-link to="/publicResources">Public Resources</router-link>&nbsp;|&nbsp;
      <router-link to="/rules">Rules</router-link></router-link>&nbsp;|&nbsp;
      <router-link v-if="!loggedIn" to="/Apply">Apply</router-link>
      <span v-if="loggedIn">
        <a href="https://imgur.com/a/VwOmU4Z" target="_blank">Gallery</a>&nbsp;|&nbsp;
        <!-- <router-link to="/forum">Forum</router-link>&nbsp;|&nbsp; -->
        <router-link to="/resources">Resources</router-link>&nbsp;|&nbsp;
        <router-link to="/profile">Profile</router-link>&nbsp;|&nbsp;
        <router-link to="/Events">Calendar</router-link>&nbsp;|&nbsp;
        <router-link to="/users">Members</router-link>&nbsp;|&nbsp;
        <a v-on:click="LogOut">Log Out</a>
      </span>
      <a v-else class="login-button" href="/login">
        <img class="discord-logo" src="./assets/Discord-Logo-White.png"/>
        <p class="login-text">Discord Login</p>
      </a>
      
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  .login-text{
    color:#FFFFFF; 
    font-size:.75em;
    margin-top:12px;
    font-weight:900;
    align-self:center;
  }
  
.discord-logo{
    width:30px;
    height:auto;
}

.login-button{
    position: absolute;
    right:3%;
    display: flex;
    width: 130px;
    padding: 0;
    margin:0;
    border-radius: 6px;
    background-color:#7289DA;
    align-items:center;
    justify-content: left;
}
</style>
<script lang="ts">
import * as axios from 'axios';
import { Component, Vue } from "vue-property-decorator";
import Toasted from 'vue-toasted';
 
Vue.use(Toasted)
const http = axios.default;

@Component
export default class App extends Vue{
    public loggedIn = false;

    public async beforeMount(){
     this.loggedIn = (await http.get('/authenticated')).data || false;
    }

    public async LogOut(){
      await http.get('/logout');
      this.loggedIn = (await http.get('/authenticated')).data || false;
    }
}

</script>
