<template>
  <v-app style="background-color: #424242">
    <v-app-bar app dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" text>
        <span style="margin-right: 10px">Logout</span>
        <i class="fas fa-sign-out-alt"></i>
      </v-btn>
    </v-app-bar>
    <v-content style="margin-top: 50px;">
      <v-container>
        <v-row>
          <v-col>
            <v-skeleton-loader
                :loading="loading"
                :transition="transition"
                type="card"
                dark
                width="400"
            >
              <v-card
                  dark
                  class="mx-auto mb-4"
                  max-width="400"
                  elevation="20"
              >
                <v-img
                    class="white--text align-end"
                    height="200px"
                    src="../assets/qnSFzY8.jpg"
                >
                  <v-card-title>Service Status</v-card-title>
                </v-img>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline">Ktusch-Sync: {{alive ? 'Running' : 'Dead'}}</div>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-row justify="center">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-toolbar-title v-on="on">
                                  <span v-if="alive">
                                    <i
                                       style="font-size: 60px; color: darkred;"
                                       class="fas fa-heartbeat blink"
                                    ></i>
                                  </span>
                                </v-toolbar-title>
                              </template>
                              <span>{{alive ? 'Alive': 'Dead'}}</span>
                            </v-tooltip>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                      :loading="loadingBtn"
                      :style="{left: '50%', transform:'translateX(-50%)'}"
                      fab color="pink"
                      left
                      bottom
                      absolute
                      @click="alive ? stopSync() : startSync()"
                  >
                    <v-icon color="white" size="40">mdi-{{alive ? 'pause' : 'play'}}</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-skeleton-loader>
          </v-col>

          <v-col>
            <v-skeleton-loader
                :loading="loading"
                :transition="transition"
                type="card"
                dark
                width="400"
            >
              <v-card
                  dark
                  class="mx-auto"
                  max-width="400"
                  elevation="20"
              >
                <v-img
                    class="white--text align-end"
                    height="200px"
                    src="../assets/textbox-D-data-stats-448x233.jpg"

                >
                  <v-card-title style="color: black">Service Stats</v-card-title>
                </v-img>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">Ktusch-Sync</div>
                    <v-row>
                      <v-col>
                        <v-list-item-title class="headline mb-1"></v-list-item-title>
                      </v-col>
                      <v-col>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import httpService from "../service/httpService";
    export default {
        name: "Controller",

        created() {
            this.statusCheck = setInterval(() => {
                httpService.getSyncInfo().then((resp) => {
                    this.alive = resp.data.alive
                    this.loading = false
                })
            }, 1000)
        },

        data() {
            return {
                alive: false,
                loading: true,
                loadingBtn: false,
                heartClass: '',
                transition: 'fade-transition',
                transitions: [
                    {
                        text: 'None',
                        value: undefined,
                    },
                    {
                        text: 'Fade Transition',
                        value: 'fade-transition',
                    },
                    {
                        text: 'Scale Transition',
                        value: 'scale-transition',
                    },
                ]
            }
        },

        methods: {
            logout() {
                localStorage.removeItem('user')
                window.clearInterval(this.statusCheck)
                this.$router.push('/')
            },

            async startSync() {
                this.loadingBtn = true
                await httpService.startSync()
                this.loadingBtn = false
            },

            async stopSync() {
                this.loadingBtn = true
                await httpService.stopSync()
                this.loadingBtn = false
            }
        }
    }
</script>

<style lang="scss">
  $red-live: #ea2429;
  $white: #fff;

  @keyframes blinker {
    from { transform: scale(1); }
    to { transform: scale(0.5); }
  }


  .live-indicator-block{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .live-indicator {
      background: $red-live;
      color: $white;
      padding: 6px 7px;
      line-height: 1;
      border-radius: 6px;
      text-transform: uppercase;
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      font-weight: bold;
      width: auto;

      .blink {
        animation: blinker 1s cubic-bezier(0.9, 0, 1, 1) infinite alternate;
        font-size: 10px;
        margin-right: 5px;
        vertical-align: baseline;
      }
    }
  }

  .blink {
    animation: blinker .6s cubic-bezier(0.9, 0, 1, 1) infinite alternate;
    vertical-align: baseline;
    position: relative;
    bottom: 2px;
    color: lightseagreen;
  }
</style>