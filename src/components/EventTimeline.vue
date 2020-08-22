<template>
  <v-timeline >

    <v-timeline-item
        v-for="(item, i) in timelineInfo"
        :key="i"
        :color="item.status === 'success' ? 'green': 'red'"
        large
    >
      <template v-slot:icon>
        <v-icon>{{item.icon}}</v-icon>
      </template>
      <span slot="opposite">{{item.date}}</span>
      <TimelineCard :title="item.title" :status="item.status">
        <v-card-text v-if="item.hasOwnProperty('deployNumber')">
          Deploy Number: {{item.deployNumber}}
        </v-card-text>
        <v-row v-if="item.hasOwnProperty('contacts')">
          <v-col>
            <v-row justify="center">
              <div style="font-size: 25px">
                {{item.contacts}}
              </div>
            </v-row>
          </v-col>
        </v-row>
      </TimelineCard>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
    import httpService from "../service/httpService";
    import TimelineCard from "./TimelineCard";
    export default {
        name: "EventTimeline",

        components: {
            TimelineCard
        },

        data() {
            return {
                timelineInfo: []
            }
        },

        async created() {
            let response = await httpService.getDbBackupInfo()
            this.timelineInfo.push({
                date: new Date(response.data.workflow_runs[0].updated_at).toUTCString(),
                status: response.data.workflow_runs[0].conclusion,
                icon: 'mdi-backup-restore',
                title: 'Last Database Backup',
            })

            response = await httpService.getDeployInfo()
            this.timelineInfo.push({
                date: new Date(response.data.workflow_runs[0].updated_at).toUTCString(),
                status: response.data.workflow_runs[0].conclusion,
                icon: 'mdi-cloud-upload',
                title: 'Last service deploy',
                deployNumber: response.data.workflow_runs[0].run_number
            })

            response = await httpService.getContactsCount()

            this.timelineInfo.push({
                date: new Date().toUTCString(),
                icon: 'mdi-sync',
                title: 'Contacts synchronized',
                contacts: response.data.contacts,
                status: 'success'
            })

            this.timelineInfo.sort(function(a,b){
                if (a.date > b.date) return -1;
                if (a.date < b.date) return 1;
                return 0;
            })
        }
    }
</script>

<style scoped>

</style>