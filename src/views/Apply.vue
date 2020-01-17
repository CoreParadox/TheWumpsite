<template>
  <div class="content Apply">
    <div class="row">
      <form class="col border">
        <div class="row">
          <div class="form-group col">
            <label for="CharacterName">Character Name</label>
            <input
              type="text"
              class="form-control"
              name="CharacterName"
              v-model="application.CharacterName"
              aria-describedby="nameHelp"
            />
            <small id="nameHelp" class="form-text text-muted">First and Last name.</small>
          </div>
          <div class="form-group col">
            <label for="DiscordName">Discord Name (Optional)</label>
            <input
              type="text"
              class="form-control"
              name="DiscordName"
              v-model="application.DiscordName"
              aria-describedby="DiscordNameHelp"
            />
            <small id="DiscordNameHelp" class="form-text text-muted">Include your discord name and descriminator (DiscordUser#0001).</small>
          </div>
          <div class="form-group col">
            <label for="LookingFor">What are you looking for in an FC? (Optional)</label>
            <textarea
              class="form-control"
              rows="4"
              name="LookingFor"
              value="Just write a few things that you value here."
              v-model="application.values"
              aria-describedby="LookingForHelp"
            />
            <small
              id="LookingForHelp"
              class="form-text text-muted"
            >What are you looking for in an FC? What are some values that are important to you?</small>
          </div>
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="application.ReadRules"
                id="rules"
              />
              <label for="rules" class="form-check-label">I have read the rules</label>
            </div>
            <label for="FavoriteColor">Favorite Color</label>
            <input
              type="text"
              class="form-control"
              name="FavoriteColor"
              v-model="application.FavoriteColor"
              aria-describedby="FavoriteColorHelp"
            />
            <small
              id="FavoriteColorHelp"
              class="form-text text-muted"
            >Just for fun, what's your favorite color?</small>
          </div>

          <div class="form-group col">
            <label for="AdditionalInformation">Additional Information (Optional)</label>
            <textarea
              class="form-control"
              rows="4"
              name="AdditionalInformation"
              value="Additional Information"
              v-model="application.Additional"
              aria-describedby="AdditionalInformation"
            />
            <small
              id="AdditionalInformation"
              class="form-text text-muted"
            >include any additional information, questions, feedback here</small>
          </div>
        </div>
      </form>
      <input class="btn btn-primary" type="button" value="Submit Application" v-on:click="SubmitApplication" />
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Endpoints } from "@/util/Endpoints";
import * as axios from "axios";
const http = axios.default;

@Component
export default class Apply extends Vue {
  private application: object = new Object();

  public async SubmitApplication() {
    var res = await http.post(Endpoints.Application, this.application);
  }
}
</script>