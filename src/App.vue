<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp;
      <a href="https://imgur.com/a/VwOmU4Z" target="_blank">Gallery</a>&nbsp;|&nbsp;
      <router-link to="/publicResources">Public Resources</router-link>&nbsp;|&nbsp;
      <router-link to="/calendar">Calendar</router-link>&nbsp;|&nbsp;
      <router-link to="/forum">Forum</router-link>&nbsp;|&nbsp;
      <router-link to="/resources">Resources</router-link>&nbsp;|&nbsp;
      <router-link to="/login">Login</router-link>&nbsp;|&nbsp;
      <router-link to="/profile">Profile</router-link>&nbsp;|&nbsp;
      <router-link to="/Apply">Apply</router-link>|
      <router-link to="/Events">Events</router-link>|
      <router-link to="/users">Members</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import './style/app.scss';
</style>