<template>
  <section v-if="finished" class="col-11 col-sm-10 col-md-8">
    <v-card
      class="h-full flex flex-column"
      color="secondary"
      dark
    >
      <v-card-title class="flex-column">
        <h2 class="text-3xl mx-auto my-2">Let's see who's the best</h2>
      </v-card-title>
      <div class="flex flex-initial justify-center">
        <v-card class="order-2 mb-14 mx-3 p-2" color="secondary darken-1" elevation="6">
          <img src="../../assets/first_place.png" width="150">
          <h3 class="text-3xl text-center text-accent">
            {{ this.playersScore[0].score }}
          </h3>
          <h4 class="text-2xl text-center">
            {{ this.playersScore[0].playerUsername }}
          </h4>
        </v-card>
        <v-card
          class="order-1 mt-14 mx-3 p-2"
          color="secondary darken-1" elevation="6" v-if="this.playersScore[1]">
          <img src="../../assets/second_place.png" width="150">
          <h3 class="text-3xl text-center text-accent">
            {{ this.playersScore[1].score }}
          </h3>
          <h4 class="text-2xl text-center">
            {{ this.playersScore[1].playerUsername }}
          </h4>
        </v-card>
        <v-card
          class="order-3 mt-14 mx-3 p-2"
          color="secondary darken-1" elevation="6" v-if="this.playersScore[2]">
          <img src="../../assets/third_place.png" width="150">
          <h3 class="text-3xl text-center text-accent">
            {{ this.playersScore[2].score }}
          </h3>
          <h4 class="text-2xl text-center">
            {{ this.playersScore[2].playerUsername }}
          </h4>
        </v-card>
      </div>
    </v-card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'GameResultsCard',
  props: {
    playerScore: {
      required: true,
    },

  },
  data() {
    return {
      playersScoreDefined: [] as {score: number; playerUsername: string}[],
      playersScore: [] as {score: number; playerUsername: string}[],
      myScore: null,
      finished: false,
    };
  },
  methods: {
    async updatePlayerScore() {
      const { username } = this.$route.query;
      const score = this.myScore;
      const res: { data: { playersRoom: {}; scores: {score: number; playerUsername: string}[] } } = await axios.post(`https://fyc-server.herokuapp.com/room/close/${this.$route.params.gameId}`, { username, score });
      this.playersScore = await res.data.scores.sort((a: any, b: any) => b.score - a.score);
    },
  },
  watch: {
    playerScore(val) {
      this.myScore = val;
      this.updatePlayerScore();
    },
    playersScore() {
      this.finished = true;
    },
  },
});
</script>

<style lang="scss">
.theme--dark.v-badge .v-badge__badge::after {
  border-color: var(--v-secondary-base) !important;
}
</style>
