<template>
  <v-app style="background-color: #f5f5f5">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" text>
        <span style="margin-right: 10px">Logout</span>
        <i class="fas fa-sign-out-alt"></i>
      </v-btn>
    </v-app-bar>
    <v-content>
      <span>{{resp}}</span>
    </v-content>
  </v-app>
</template>

<script>
  import httpService from "../service/httpService";
    export default {
        name: "Controller",

        created() {
            setTimeout(() => {
                httpService.getSyncInfo().then((resp) => {
                    this.resp = resp.data
                    this.loading = false
                })
            }, 1500)
        },

        data() {
            return {
                resp: 'wait',
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
            }
        }
    }
</script>

<style lang="scss">
  $red-live: #ea2429;
  $white: #fff;

  @keyframes blinker {
    from { opacity: 1; }
    to { opacity: 0; }
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
    margin-right: 5px;
    vertical-align: baseline;
    color: lightseagreen;
  }
</style>