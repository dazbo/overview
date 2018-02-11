<template>
    <div class="profil-card">
        <div class="portrait">
        </div>
        <div class="player">
            {{name}}
        </div>
        <div class="rank">
            {{rating}}
        </div>
        <div class="text">
            {{played}} / {{won}}
        </div>
        <div class="actions">
            <button @click="refresh">Refresh</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "profil-card",
  props: {
    profil: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: null,
      rating: null,
      played: 0,
      won: 0
    };
  },
  created() {
    this.name = this.profil.data.name;
    this.rating = this.profil.data.rating;
    this.played = this.profil.data.competitiveStats.games.played;
    this.won = this.profil.data.competitiveStats.games.won;
  },
  methods: {
    refresh() {
      const { battletag, region, platform } = this.profil;
      this.$emit("profilRefresh", { battletag, region, platform });
    }
  }
};
</script>

<style scoped>
.profil-card {
  font-family: "Nunito Sans", "Arial";
  font-size: 12px;
  width: 350px;
  height: 500px;
  color: #1bd8e6;
  border: 1px solid #2dfafc;
  background-color: #131d44;
  border-radius: 1em;
  padding: 0.5em;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  margin: 0.5em;
}

.portrait {
  flex: 0 1 50%;
}

.player {
  font-family: "BigNoodleTitling", "Arial";
  font-style: italic;
  text-transform: uppercase;
  font-size: 38px;
}

.rank {
  font-family: "BigNoodleTitling", "Arial";
  font-style: italic;
  text-transform: uppercase;
  color: white;
  font-size: 55px;
  padding: 0.25em 0;
}

.text {
  text-transform: uppercase;
  font-size: 19px;
}

.actions {
  flex: 1 1 auto;
  align-items: flex-end;
  display: flex;
  flex-direction: row-reverse;
}
</style>
