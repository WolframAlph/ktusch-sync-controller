<template>
  <v-app dark>
    <Toolbar />
    <v-main style="background-color: #424242">
      <v-container>
        <v-row>
          <v-col cols="12" sm="5">
            <HeartbeatCard :alive="alive" :loading="loading"/>
          </v-col>
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
                })
            }, 1000)
        },

        beforeDestroy() {
            console.log('destroyed')
            clearInterval(this.statusCheck)
        },

        data() {
            return {
                lastDbBackupStatus: null,
                lastDbBackupDate: null,
                alive: false,
                loading: true
            }
        },
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