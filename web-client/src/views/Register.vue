<template>
  <div class="flex flex-column col-7 mx-auto bg-info bg-opacity-75 rounded my-4">
    <h1 class="text-3xl text-secondary text-center">Register</h1>
    <form class="text-center col-8 mx-auto">
      <v-text-field
        class="my-2"
        v-model="firstname"
        label="Your first name"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>
      <v-text-field
        class="my-2"
        v-model="lastname"
        label="Your last name"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>
      <v-text-field
        class="my-2"
        v-model="username"
        label="Your user name"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>
      <v-text-field
        class="my-2"
        v-model="password"
        type="password"
        label="Your password"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>
      <v-text-field
        class="my-2"
        v-model="email"
        label="Your email"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>
      <v-btn @click="createUser()" color="primary">Register</v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'Register',
  data() {
    return {
      firstname: null,
      lastname: null,
      username: null,
      password: null,
      email: null,
    };
  },
  methods: {
    createUser() {
      axios.post('https://fyc-server.herokuapp.com/user', {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password,
        email: this.email,
        isPlaying: false,
      });
      this.$router.push('/');
    },
  },
});
</script>
