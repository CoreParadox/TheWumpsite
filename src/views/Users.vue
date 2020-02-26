<template>
  <div class="content users">
      <ul id="users">
        <li v-for="user in users" v-bind:key="user.Id"><router-link v-bind:to="'/user/'+user.Id">{{`${user.FirstName} ${user.LastName} (${user.PreferredName}) - ${user.Pronouns}`}}</router-link></li>
      </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { LoggedInGuard } from '@/util/LoggedInGuard'
import {Endpoints} from '@/util/Endpoints';
import * as axios from 'axios';
const http = axios.default;

@Component({
  beforeRouteEnter: LoggedInGuard.isLoggedIn
})

export default class Users extends Vue{
  public users:{url:string, name:string}[] = [];
  
  public async beforeMount(){
    await this.LoadUsers();
  }

  public async LoadUsers(){
    var res = await http.get(Endpoints.Users);
    this.users = res.data;
  }
}
</script>

