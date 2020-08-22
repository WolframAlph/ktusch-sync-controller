<template>
  <v-app-bar app>
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout" text>
      <span style="margin-right: 10px">Logout</span>
      <i class="fas fa-sign-out-alt"></i>
    </v-btn>
  </v-app-bar>
</template>

<script>
    export default {
        name: "Toolbar",

        methods: {
            logout() {
                localStorage.removeItem('user')
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>