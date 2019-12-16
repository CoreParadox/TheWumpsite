<template>
  <div class="login">
      <a class="login-button" href="/login">
        <img class="discord-logo" src="../assets/Discord-Logo-White.png"/>
        <p class="login-text">Login with Discord</p>
      </a>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Login extends Vue {}
</script>

<style scoped>
.login-text{
    color:#FFFFFF; 
    font-weight:900;
}
.discord-logo{
    width:40px; 
    height:auto;
}
.login {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position:fixed;
}

.login-button{
    display: flex;
    width: 25%;
    padding: 0;
    margin:0;
    border-radius: 6px;
    background-color:#7289DA;
    align-items:center;
    justify-content: center;
}
</style>
