<template>
  <div class="content Events"> 
    <vue-cal style="height: 100%" :events='eventList' :twelveHour='true' :timeFrom='0' :timeTo='24*60' events-count-on-year-view events-on-month-view="short"></vue-cal>
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
  private events = [];

  get eventList(){
    return this.events;
  }
  public async beforeMount(){
    console.log("Loading...")
    await this.LoadEvents();
  }

  public async LoadEvents() {
    var res = await http.get(Endpoints.Events);
    this.events = res.data.map(e => {
     return {
        title:e.title,
        startDate:new Date(e.start),
        endDate:new Date(e.end),
      }
    });
    console.log(this.events);
  }
}



</script>