<template>
  <v-card elevation="15" hover>
    <v-card-title>
      {{title}}
    </v-card-title>

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