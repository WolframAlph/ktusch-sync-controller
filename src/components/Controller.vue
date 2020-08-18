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
    <v-content>
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
                  class="mx-auto"
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
                    <div class="overline mb-4">Ktusch-Sync</div>
                    <v-row>
                      <v-col>
                        <v-list-item-title class="headline mb-1">Synchronization Status:</v-list-item-title>
                      </v-col>
                      <v-col>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-toolbar-title v-on="on">
                              <v-icon :class="{'blink': resp.alive}" color="pink">mdi-heart</v-icon>
                            </v-toolbar-title>
                          </template>
                          <span>{{resp.alive ? 'Alive': 'Dead'}}</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-btn @click="startSync" :disabled="resp.alive" text dark>Start</v-btn>
                  <v-btn @click="stopSync" :disabled="!resp.alive" text dark>Stop</v-btn>
                </v-card-actions>
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
            setInterval(() => {
                httpService.getSyncInfo().then((resp) => {
                    this.resp = resp.data
                    this.loading = false
                })
            }, 1000)
        },

        data() {
            return {
                resp: '',
                loading: true,
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
                this.$router.push('/')
            },

            async startSync() {
                await httpService.startSync()
            },

            async stopSync() {
                await httpService.stopSync()
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
    font-size: 20px;
    vertical-align: baseline;
    color: lightseagreen;
  }
</style>