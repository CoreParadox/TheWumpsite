<template>
  <div class="resources">
      <p>resources</p>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import * as axios from 'axios';
var http = axios.default;

@Component({
  components: {
    HelloWorld,
  },
  beforeRouteEnter: async (_, __, next) => (await http.get('/authenticated')).data ? next() : null
})

export default class Resources extends Vue{}
</script>

