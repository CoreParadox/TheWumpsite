<template>
  <div class="content Events"> 
    <vue-cal style="height: 40%"></vue-cal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { LoggedInGuard } from "@/util/LoggedInGuard";
import { Endpoints } from "@/util/Endpoints";
import * as axios from "axios";
const http = axios.default;
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

@Component({
   components: { 'vue-cal': VueCal }
  //beforeRouteEnter: LoggedInGuard.isLoggedIn,
})
export default class EventCalendar extends Vue {
  public events = [];
  public async LoadEvents() {
    var res = await http.get(Endpoints.Events);
    this.events = res.data;
  }
}
</script>