<template>
  <div>
    <form v-if="!testId">
      <v-select
        class="my-2"
        v-model="themeId"
        label="Select a Theme"
        color="primary"
        :items="themesContent"
        item-text="name"
        item-value="id"
        outlined
        required
        hide-details
      ></v-select>

      <v-btn @click="newTheme = !newTheme">New Theme</v-btn>

      <v-text-field
        v-if="newTheme"
        class="my-2"
        v-model="themeName"
        label="Theme Name"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>

      <v-text-field
        class="my-2"
        v-model="testName"
        label="Test Name"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>

      <v-btn
        color="primary"
        class="mx-auto my-2"
        @click="createTest"
      >
        Create
      </v-btn>
    </form>
    <form v-else class="text-center" ref="questionForm">
      <v-text-field
        class="my-2"
        v-model="questionName"
        label="Question"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>

      <v-text-field
        class="my-2"
        v-model="goodAnswer"
        label="Good Answer"
        color="primary"
        outlined
        required
        hide-details
      ></v-text-field>

      <div v-for="(answer, index) in wrongAnswers" :key="index" class="flex">
        <v-text-field
          class="my-2"
          v-model="wrongAnswers[index]"
          label="Wrong Answer"
          color="primary"
          outlined
          required
          hide-details
        ></v-text-field>
        <v-btn
          v-if="wrongAnswers.length > 1 && index === wrongAnswers.length - 1"
          @click="wrongAnswers.shift()"
          class="align-self-center ml-2"
          color="error"
          fab
          small
          outlined
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-btn @click="wrongAnswers.push('')" color="success" fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <div class="flex justify-space-around">
        <v-btn color="primary" @click="createQuestion(false)">New Question</v-btn>
        <v-btn color="primary" outlined @click="createQuestion(true)">Create room</v-btn>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'NewTestForm',
  data() {
    return {
      themeId: null,
      themeName: null,
      testName: null,
      themesContent: [] as any[],
      newTheme: false,
      testId: null,
      questionName: null,
      goodAnswer: null,
      wrongAnswers: [''],
    };
  },
  methods: {
    getThemesAndTests() {
      return axios.get('http://localhost:3000/theme');
    },
    async createTest() {
      if (this.newTheme) {
        await this.createTheme();
      }
      const testData = await axios.post('http://localhost:3000/test', {
        name: this.testName,
        nbQuestion: 0,
        themeId: this.themeId,
      });
      this.testId = testData.data.id;
    },
    async createTheme() {
      const theme: any = await axios.post('http://localhost:3000/theme', { name: this.themeName });
      this.themeId = theme.data.id;
    },
    async createQuestion(isEnding: boolean) {
      const res = await axios.post('http://localhost:3000/question', {
        content: this.questionName,
        testId: this.testId,
      });
      await axios.post('http://localhost:3000/answer', {
        content: this.goodAnswer,
        isCorrect: true,
        questionId: res.data.id,
      });

      for (let i = 0; i < this.wrongAnswers.length; i += 1) {
        axios.post('http://localhost:3000/answer', {
          content: this.wrongAnswers[i],
          isCorrect: false,
          questionId: res.data.id,
        });
      }

      if (isEnding) {
        this.$emit('test-creation-finished');
      } else {
        this.$refs.questionForm.reset();
      }
    },
  },
  async mounted() {
    const res = await this.getThemesAndTests();
    this.themesContent = [...res.data];
  },
});
</script>
