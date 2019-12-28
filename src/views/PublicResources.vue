<template>
  <div class="publicResources">
      <ul id="resources">
        <li v-for="resource in resources" v-bind:key="resource.name"><a v-bind:href='resource.url'>{{resource.name}}</a></li>
      </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import {Endpoints} from '@/util/Endpoints';
import * as axios from 'axios';
const http = axios.default;

@Component({
})
export default class publicResources extends Vue{
  public resources:{url:string, name:string}[] = [];

  public async beforeMount(){
    console.log("Loading...")
    await this.LoadResources();
  }

  public async LoadResources(){
    var res = await http.get(Endpoints.PublicResources);
    console.log(res.data);
    this.resources = res.data;
  }
  
}
</script>

