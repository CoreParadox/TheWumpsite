<template>
  <div class="profile">
    <div class="row">
    <form class="col border">
        <h2>Profile</h2>
      <div class="row">
        <div class="form-group col">
          <label for="PreferredName">Preferred Name</label>
          <input type="text" class="form-control" name="PreferredName" aria-describedby="nameHelp" />
          <small
            id="nameHelp"
            class="form-text text-muted"
          >What you want people to call you when addressing you, not your character.</small>
        </div>

        <div class="form-group col">
          <label for="Pronoun">Pronouns</label>
          <input class="form-control" type="text" name="Pronoun" />
        </div>
      </div>
        <div class="row">
          <div class="form-group col">
            <label for="Housing">Housing Address (District, Ward, Lot)</label>
            <input type="text" class="form-control" name="Housing" />
          </div>
          <div class="col">
            <h4>Roles</h4>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value id="DPS" />
              <label for="DPS" class="form-check-label">DPS</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="Healer" />
              <label for="Healer" class="form-check-label">Heal</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="Tank" />
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
          aria-describedby="aboutmehelp"
        />
        <small
          id="aboutmehelp"
          class="form-text text-muted"
        >Just a little blurb about you. Things you like, some unique thing, or nothing, whatever you'd like.</small>
      </div>

    </form>
    <span class="col-1"/>
    <form class="col  border">
         <h2>Character</h2>
         
        <div class="row">
        <div class="form-group col">
          <label for="fname">First Name</label>
          <input type="text" class="form-control" name="fname" />
        </div>
        <div class="form-group col">
          <label for="lname">Last Name</label>
          <input type="text" class="form-control" name="lname" />
        </div>
        </div>
      <div class="row">
        <div class="form-group col">
          <label for="Race">Race</label>
          <select name="race" class="form-control" id="race">
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
          <select name="gender" class="form-control" id="gender">
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
        />
      </div>
    </form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { LoggedInGuard } from '@/util/LoggedInGuard';

@Component({
  components: {
    HelloWorld
  },
  beforeRouteEnter: LoggedInGuard.isLoggedIn
})
export default class Home extends Vue {}
</script>