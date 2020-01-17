<template>
  <div class="content user">
    <p>Preferred Name:{{user.PreferredName}}</p>
    <p>Pronouns: {{user.Pronoun}}</p>
    <p>Housing: {{user.Housing}}</p>
    <p>DPS: {{user.Roles.DPS}}</p>
    <p>Healer: {{user.Roles.Healer}}</p>
    <p>Tank: {{user.Roles.Tank}}</p>
    <pre>{{user.Description}}</pre>
    <p>{{`${character.Race} - ${character.Gender}`}}</p>
    <p>{{`${character.FirstName} ${character.LastName}`}}</p>
    <pre>{{character.Description}}</pre>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { LoggedInGuard } from '@/util/LoggedInGuard'
import {Endpoints} from '@/util/Endpoints';
import { Profile as UserProfile } from '../../server/models/profile';
import { Character } from '../../server/models/character';
import * as axios from 'axios';
const http = axios.default;

@Component({
  beforeRouteEnter: LoggedInGuard.isLoggedIn
})

export default class User extends Vue{
  public user:UserProfile = new UserProfile();
  private character:Character = new Character();
  private Id: string = "";

  public async beforeMount(){
    this.Id = this.$route.params.id;
    await this.LoadUser();
  }

  public async LoadUser(){
    var res = await http.get(Endpoints.User(this.Id));
    this.user = res.data.Profile;
    this.character = res.data.Profile.Character;
  }
}
</script>

