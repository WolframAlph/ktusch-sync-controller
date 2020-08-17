<template>
  <v-container style="max-width: 40%">
    <v-sheet
        :color="`grey darken-2`"
        class="px-3 pt-3 pb-3"
        style="background-color: transparent;"
    >
      <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          max-width="100%"
          type="card"
          height="300px"
      >
        <v-card>
          <v-card-title>{{resp}}</v-card-title>
          <v-card-text>Card Text</v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-sheet>
  </v-container>

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
                resp: 'asd',
                loading: true,
                transition: 'scale-transition',
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
        }
    }
</script>

<style>

</style>