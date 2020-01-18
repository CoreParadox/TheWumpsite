<template>
  <div class="content Apply">
      <form class="col border">
        <div class="row">
          <div class="form-group col">
            <label for="CharacterName">Character Name</label>
            <input type="text" class="form-control" name="CharacterName" v-model="application.CharacterName" aria-describedby="nameHelp"/>
            <small id="nameHelp" class="form-text text-muted">First and Last name.</small>
            <label for="DiscordName">Discord Name (Optional)</label>
            <input type="text" class="form-control" name="DiscordName" v-model="application.DiscordName" aria-describedby="DiscordNameHelp"/>
            <small id="DiscordNameHelp" class="form-text text-muted">
              Include your discord name and descriminator (DiscordUser#0001).
            </small>
            <label for="FavoriteColor">Favorite Color</label>
            <input type="text" class="form-control" name="FavoriteColor" v-model="application.FavoriteColor" aria-describedby="FavoriteColorHelp"/>
            <small id="FavoriteColorHelp" class="form-text text-muted">
              Just for fun, what's your favorite color?
            </small>
          </div>
          <div class="form-group col">
            <label for="LookingFor">What are you looking for in an FC? (Optional)</label>
            <textarea class="form-control" rows="4" name="LookingFor" value="Just write a few things that you value here." v-model="application.Values" aria-describedby="LookingForHelp"/>
            <small id="LookingForHelp" class="form-text text-muted">
              What are you looking for in an FC? What are some values that are important to you?
            </small>
      

<div class="modal fade" id="rulesModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rules</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <h5>We're extremely relaxed here, and most of these rules come down to being respectful, however I think it's important to be transparent and outline everything, especially some things that are easy to forget. 
              You will not be approved unless you thoroughly read the rules. If you don't agree with any of the rules, this might not be the right fit for you.</h5>

              <ol> 
                  <li>No Discrimination: No racism, hate speech, transphobia, homophobia, sexism, ableism, or overly offensive humor ( jokes related to the aforementioned topics or triggering topics</li>
                  <li>No Controversy: Please respect other members, keep talk of controversial issues, such as, but not limited to politics, to a minimum. if someone expresses discomfort with a topic, please respect them and stop discussion, or move it to a DM.</li>
                  <li>Be Conscientious: If you are going to post something potentially triggering EG: Gore, a post talking about trauma, etc. please tag it as such and mark it as a spoiler.</li>
                  <li>Be Mature: Be kind and mature, it's ok to have fun, but know when & where to be serious and silly.</li>
                  <li>Be Safe: No posting of personal information or doxxing.</li>
                  <li>Don't Be Gross: Don't post explicit images, pornography, gore, etc..</li>
                  <li>Don't Impersonate: Do not impersonate anyone, especially moderators/admins, even as a joke. If you read the rules, fill in the favorite color field with the phrase: green beans</li>
                  <li>Use Your Inside Voice: Don't mic spam, use voice changers, play sound effects or music over voice chat.</li>
                  <li>Post Wisely: Don't spam channels. Don't post referral links, pirated materials, ads, invites/ads for other discords or groups, or executables. This includes not abusing bot commands.</li>
                  <li>Don't Steal: Don't repost/use creative material from without explicit written permission from the creator.</li>
              </ol>
              <b>Overall most things won't be problematic, use your best judgement, so have fun, be respectful, and be positive, such is the Way of the Wump!</b>
      </div>
    </div>
  </div>
</div>
<br>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#rulesModal">Rules</button>
            <br>
            <br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="application.ReadRules" id="rules"/>&nbsp;
              <label for="rules" class="form-check-label">I have read the rules</label>
            </div>
            <br>
            <br>
            <input class="btn btn-primary" type="button" value="Submit Application" v-on:click="SubmitApplication"/>
          </div>
          <div class="form-group col">
            <label for="AdditionalInformation">Additional Information (Optional)</label>
            <textarea class="form-control" rows="4" name="AdditionalInformation" value="Additional Information" v-model="application.Additional" aria-describedby="AdditionalInformation"/>
            <small id="AdditionalInformation" class="form-text text-muted">
              include any additional information, questions, feedback here
            </small>
          </div>
        </div>
      </form>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Endpoints } from "@/util/Endpoints";
import {Application} from "../../server/models/application";
import * as axios from "axios";
const http = axios.default;

@Component
export default class Apply extends Vue {
  private application: Application = new Application();

  public async SubmitApplication() {
    var res = await http.post(Endpoints.Application, this.application);
  }
}
</script>
<style lang="scss">
@import '@/style/scheme.scss';
.modal-content{
  background-color:$primary-color !important;
  text-align:justify;
}

.modal-lg, .modal-xl {
  max-width:90vw !important;
}

</style>