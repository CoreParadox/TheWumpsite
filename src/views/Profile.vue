<template>
  <div class="content profile">
    <div class="row">
    <form class="col border">
        <h2>Profile</h2>
      <div class="row">
        <div class="form-group col">
          <label for="PreferredName">Preferred Name</label>
          <input type="text" class="form-control" name="PreferredName" v-model="user.PreferredName" aria-describedby="nameHelp" />
          <small
            id="nameHelp"
            class="form-text text-muted"
          >What you want people to call you when addressing you, not your character.</small>
        </div>

        <div class="form-group col">
          <label for="Pronoun">Pronouns</label>
          <input class="form-control" type="text" v-model="user.Pronoun" name="Pronoun" />
        </div>
      </div>
        <div class="row">
          <div class="form-group col">
            <label for="Housing">Housing Address (District, Ward, Lot)</label>
            <input type="text" class="form-control" v-model="user.Housing" name="Housing" />
          </div>
          <div class="col">
            <h4>Roles</h4>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="user.Roles.DPS" id="DPS" />
              <label for="DPS" class="form-check-label">DPS</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="user.Roles.Healer" id="Healer" />
              <label for="Healer" class="form-check-label">Heal</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="user.Roles.Tank" id="Tank" />
              <label for="Tank" class="form-check-label">Tank</label>
            </div>
          </div>
        </div>
              <div class="form-group col">
        <label for="Description">About you</label>
        <textarea
          class="form-control"
          rows="4"
          name="Description"
          value="Enter your characters description here."
          v-model="user.Description"
          aria-describedby="aboutmehelp"
        />
        <small
          id="aboutmehelp"
          class="form-text text-muted"
        >Just a little blurb about you. Things you like, some unique thing, or nothing, whatever you'd like.</small>
      </div>
      <input class="btn btn-primary" type="button" value="Save Profile" v-on:click="SaveProfile">
    </form>
    <span class="col-1"/>
    <form class="col  border">
         <h2>Character</h2>
        <div class="row">
        <div class="form-group col">
          <label for="fname">First Name</label>
          <input type="text" class="form-control" name="fname" v-model="character.FirstName"/>
        </div>
        <div class="form-group col">
          <label for="lname">Last Name</label>
          <input type="text" class="form-control" name="lname" v-model="character.LastName"/>
        </div>
        </div>
      <div class="row">
        <div class="form-group col">
          <label for="Race">Race</label>
          <select name="race" class="form-control" id="race" v-model="character.Race">
            <option>Hyur</option>
            <option>Elezen</option>
            <option>Lalafell</option>
            <option>Miqo'te</option>
            <option>Roegadyn</option>
            <option>Au Ra</option>
            <option>Hrothgar</option>
            <option>Viera</option>
          </select>
        </div>
        <div class="form-group col">
          <label for="Gender">Gender</label>
          <select name="gender" class="form-control" id="gender" v-model="character.Gender">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>
      <div class="form-group col">
        <label for="Description">Description</label>
        <textarea
          name="Description"
          class="form-control"
          rows="6"
          value="Enter your characters description here."
          v-model="character.Description"
        />
      </div>
      <input class="btn btn-primary" type="button" id="SaveCharacter" v-on:click="SaveCharacter" value="Save">
    </form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { LoggedInGuard } from '@/util/LoggedInGuard';
import { Profile as UserProfile } from '../../server/models/profile';
import { Character } from '../../server/models/character';
import {Endpoints} from '@/util/Endpoints';
import * as axios from 'axios';
const http = axios.default;
@Component({
  beforeRouteEnter: LoggedInGuard.isLoggedIn
})
export default class Profile extends Vue {
  public user:UserProfile = new UserProfile();
  private character:Character = new Character();
  

  public async beforeMount(){
    await this.LoadProfile();
    await this.LoadCharacter();
  }
  

  public async SaveProfile(){
    var res = await http.put(Endpoints.Profile, this.user);
    this.user = res.data;
  }

  public async LoadProfile(){
    var res = await http.get(Endpoints.Profile);
    this.user = res.data;
  }

  public async LoadCharacter(){
    var res = await http.get(Endpoints.Character);
    this.character = res.data;
  }

  public async SaveCharacter(){
    var res = await http.put(Endpoints.Character, this.character);
    this.character = res.data;
  }


}
</script>