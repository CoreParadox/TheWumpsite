<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp;
      <router-link to="/publicResources">Public Resources</router-link>&nbsp;|&nbsp;
      <router-link v-if="!loggedIn" to="/Apply">Apply&nbsp;|&nbsp;</router-link>
      <span v-if="loggedIn">
        <a href="https://imgur.com/a/VwOmU4Z" target="_blank">Gallery</a>&nbsp;|&nbsp;
        <router-link to="/forum">Forum</router-link>&nbsp;|&nbsp;
        <router-link to="/resources">Resources</router-link>&nbsp;|&nbsp;
        <router-link to="/profile">Profile</router-link>&nbsp;|&nbsp;
        <router-link to="/Events">Calendar</router-link>&nbsp;|&nbsp;
        <router-link to="/users">Members</router-link>&nbsp;|&nbsp;
        <a v-on:click="LogOut">Log Out</a>
      </span>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import './style/app.scss';
</style>
<script lang="ts">
import * as axios from 'axios';
import { Component, Vue } from "vue-property-decorator";
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