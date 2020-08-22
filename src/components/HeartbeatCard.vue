<template>
  <v-skeleton-loader :loading="loading" type="card">
    <v-card hover max-width="500" class="mx-auto mb-4" elevation="20">
      <v-img class="white--text align-end" height="200px" src="../assets/qnSFzY8.jpg">
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
                          <i style="font-size: 60px; color: darkred;" class="fas fa-heartbeat blink"></i>
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
</template>

<script>
    import httpService from "../service/httpService";

    export default {
        name: "HeartbeatCard",

        props: {
            alive: {
                type: Boolean
            },
            loading: {
                type: Boolean
            }
        },

        methods: {
            async startSync() {
                await httpService.startSync()
            },

            async stopSync() {
                await httpService.stopSync()
            }
        },
    }
</script>

<style scoped>

</style>