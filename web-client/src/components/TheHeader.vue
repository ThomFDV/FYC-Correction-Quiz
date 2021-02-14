<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <router-link to="/" class="text-4xl text-white">{{ applicationName }}</router-link>
<!--      <h2 class="" @click="this.$router.push('')">{{ applicationName }}</h2>-->
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-btn color="secondary" to="/register">Register</v-btn>
    </div>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheHeader',
  props: {
    applicationName: String,
  },
});
</script>

<style lang="scss">
  .text-white {
    color: white !important;
  }
</style>
