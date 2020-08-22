<template>
  <v-app>
    <Toolbar />
    <v-main>
      <v-container>
        <h1>Time {{alive ? 'up' : 'down'}}: {{alive ? timeUp : timeDown}}</h1>
        <v-row>
          <v-col>
            <HeartbeatCard :alive="alive" :loading="loading"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <EventTimeline/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import httpService from "../service/httpService";
  import Toolbar from "./Toolbar";
  import HeartbeatCard from "./HeartbeatCard";
  import EventTimeline from "./EventTimeline";

    export default {
        name: "Controller",

        components: {
            Toolbar,
            HeartbeatCard,
            EventTimeline
        },

        async created() {
            this.statusCheck = setInterval(() => {
                httpService.getSyncInfo().then((resp) => {
                    this.alive = resp.data.alive
                    this.loading = false
                    this.timeUp = this.countdown(resp.data.time_up)
                    this.timeDown = this.countdown(resp.data.time_down)
                })
            }, 1000)
              this.$vuetify.theme.dark = true
        },

        beforeDestroy() {
            clearInterval(this.statusCheck)
        },

        data() {
            return {
                lastDbBackupStatus: null,
                lastDbBackupDate: null,
                alive: false,
                loading: true,
                timeUp: null,
                timeDown: null
            }
        },

        methods: {
            countdown(s) {
                s = Math.floor(s)
              const d = Math.floor(s / (3600 * 24));

              s  -= d * 3600 * 24;

              const h   = Math.floor(s / 3600);

              s  -= h * 3600;

              const m = Math.floor(s / 60);

              s  -= m * 60;

              const tmp = [];

              (d) && tmp.push(d + 'd');

              (d || h) && tmp.push(h + 'h');

              (d || h || m) && tmp.push(m + 'm');

              tmp.push(s + 's');

              return tmp.join(' ');
          }
        }
    }
</script>

<style lang="scss">

  @keyframes blinker {
    from { transform: scale(1); }
    to { transform: scale(0.5); }
  }

  .blink {
    animation: blinker .6s cubic-bezier(0.9, 0, 1, 1) infinite alternate;
    vertical-align: baseline;
    position: relative;
    bottom: 2px;
    color: lightseagreen;
  }
</style>