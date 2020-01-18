<template>
  <div class="content publicResources">
      <ul id="resources">
        <li v-for="resource in resources" v-bind:key="resource.name">
          <a v-bind:href='resource.url' target="_blank" v-bind:class="resource.className">
            <div class="link-icon"></div>
            <div class="link-text">{{resource.name}}</div>
          </a>
        </li>
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
  public resources: { url: string, name: string, className: string }[] = [];

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

<style lang="scss">
@import "@/style/app.scss";
.publicResources{
  ul {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 25%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      flex: .2;
      list-style: none;
      width: 100%;
      margin: .5em 0;

      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 30px;
        color: $text-color-dark;
        background: $secondary-color;
        background: linear-gradient(90deg, rgba(149,163,179,1) 0%, $highlight-color 50%, $highlight-color 100%);
        background-size: 200% 100%;
        border-radius: 1em;
        transition: color .5s ease, background-position .5s ease; 

        &:hover {
          background-position: 100%;
          color: $text-color-light;
        }

        .link-icon, .link-text {
          height: 100%;
          margin: 0;
          padding: 0;
          display: inline-flex;
        }

        .link-icon {
          flex: 1;
          border-radius: 1em;
          background-color: $secondary-color;
          background-size: 80%;
          background-position: 50%;
          background-repeat: no-repeat;
        }

        .link-text {
          flex: 4;
          padding-left: 1em;
          align-items: center;
        }

        &.console-games-wiki {
          background: $console-games-wiki-bg-gradient;
          background-size: 200% 100% !important;

          &:hover {
            background-position: 100% !important;
          }

          .link-icon {
            background-image: url('https://ffxiv.consolegameswiki.com/mediawiki/images/ffxiv_new_logo3.png');
          }
        }

        &.console-games-wiki, &.gamer-escape, &.ariyalas-toolkit, &.garland-tools, &.xiv-db {
          background-size: 200% 100% !important;

          &:hover {
            background-position: 100% !important;
          }
        }

        &.gamer-escape, &.ariyalas-toolkit {
          .link-icon:after {
            font-size: 60px;
            font-weight: bold;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
          }
        }

        &.console-games-wiki {
          background: $console-games-wiki-bg-gradient;
          
          .link-icon {
            background-image: url('https://ffxiv.consolegameswiki.com/mediawiki/images/ffxiv_new_logo3.png');
          }
        }

        &.gamer-escape {
          background: $gamer-escape-gradient;

          .link-icon:after {
            content: 'GE';
          }
        }

        &.ariyalas-toolkit {
          background: $ariyalas-toolkit-gradient;

          .link-icon:after {
            content: 'AT';
          }
        }

        &.garland-tools {
          background: $garland-tools-gradient;

          .link-icon {
            background-image: url('http://www.garlandtools.org/GarlandLogo.png');
          }
        }
      }
    }
  }
}
</style>