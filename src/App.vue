<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <a href="https://imgur.com/a/VwOmU4Z">Gallery</a>|
      <router-link to="/publicResources">Public Resources</router-link>|
      <router-link to="/calendar">Calendar</router-link>|
      <router-link to="/forum">Forum</router-link>|
      <router-link to="/resources">Resources</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/profile">Profile</router-link>|
      <router-link to="/users">Members</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
html,body{
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d3d3d3;
  background: #4a5764;
  height: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app > div{
  width: 80%;
  margin-left:10%;
}
</style>
