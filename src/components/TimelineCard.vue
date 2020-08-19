<template>
  <v-card elevation="15" dark>
    <v-card-title>
      {{title}}
    </v-card-title>
    <v-card-text>
      Status : {{status}}
    </v-card-text>
    <slot></slot>
  </v-card>
</template>

<script>
    export default {
        name: "TimelineCard",

        props: {
            title: String,
            status: String
        }
    }
</script>

<style scoped>

</style>