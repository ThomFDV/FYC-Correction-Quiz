<template>
  <div class="flex flex-column col-7 mx-auto">
    <div v-if="!createTest">
      <h1 class="text-2xl text-center text-primary">Create your room using available tests</h1>
      <div class="flex justify-center">
        <h3 class="text-xl text-secondary mr-3">Or create a new test!</h3>
        <v-btn @click="createTest = !createTest" color="secondary" outlined>New test</v-btn>
      </div>
      <form>
        <v-select
          class="my-2"
          v-model="themeId"
          label="Select a Theme"
          color="primary"
          :items="themesContent"
          item-text="name"
          item-value="id"
          @change="displayTests"
          outlined
          required
          hide-details
        ></v-select>

        <v-select
          v-if="themeId"
          class="my-2"
          v-model="testId"
          label="Select a Test"
          color="primary"
          :items="tests"
          item-text="name"
          item-value="id"
          outlined
          required
          hide-details
        ></v-select>

        <v-text-field
          class="my-2"
          v-model="roomName"
          label="Game Name"
          color="primary"
          outlined
          required
          hide-details
        ></v-text-field>

        <v-text-field
          class="my-2"
          v-model="userName"
          label="Your username"
          color="primary"
          outlined
          required
          hide-details
        ></v-text-field>

        <v-btn
          :disabled="!themeId && !testId && !roomName"
          color="primary"
          class="mx-auto my-2"
          @click="createGame"
        >
          Create
        </v-btn>
      </form>
    </div>
    <new-test-form v-else @test-creation-finished="updateData()">
    </new-test-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import NewTestForm from './NewTestForm.vue';

export default Vue.extend({
  name: 'NewRoomForm',
  components: {
    NewTestForm,
  },
  data() {
    return {
      testId: null,
      themeId: null,
      roomName: null,
      userName: null,
      themesContent: [] as any[],
      tests: [],
      createTest: false,
    };
  },
  methods: {
    getThemesAndTests() {
      return axios.get('https://fyc-server.herokuapp.com/theme');
    },
    displayTests() {
      const themeSelected: any = this.themesContent.filter((theme) => theme.id === this.themeId)[0];
      this.tests = themeSelected.tests;
    },
    createGame() {
      const roomData = {
        name: this.roomName,
        testId: this.testId,
        username: this.userName,
      };
      this.$emit('create-room', roomData);
    },
    async updateData() {
      this.createTest = false;
      const res = await this.getThemesAndTests();
      this.themesContent = [...res.data];
    },
  },
  async mounted() {
    const res = await this.getThemesAndTests();
    this.themesContent = [...res.data];
  },
});
</script>
