<template>
  <div class="resources">
      <p>resources</p>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { LoggedInGuard } from '@/util/LoggedInGuard'

@Component({
  beforeRouteEnter: LoggedInGuard.isLoggedIn
})

export default class Resources extends Vue{}
</script>

