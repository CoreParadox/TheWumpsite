<template>
  <div class="content resources">
      <ul id="resources">
        <li v-for="resource in resources" v-bind:key="resource.name"><a v-bind:href='resource.url'>{{resource.name}}</a></li>
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

export default class Resources extends Vue{
  public resources:{url:string, name:string}[] = [];
  
  public async beforeMount(){
    await this.LoadResources();
  }

  public async LoadResources(){
    var res = await http.get(Endpoints.Resources);
    this.resources = res.data;
  }
}
</script>

