<template>
  <div>
    <ProfilRow v-for="profil in players" :key="profil.username" :profil="profil" @profilRefresh="refreshProfil" />
  </div>
</template>

<script>
import * as playerServices from "../data/playerServices";
import ProfilRow from "./profile/ProfilRow";

export default {
  name: "home",
  components: { ProfilRow },
  data() {
    return {
      players: []
    };
  },
  mounted() {
    const players = playerServices.getProfiles();
    if (!players || !players.length) {
      this.$router.push({ name: "ManagePlayers" });
    } else {
      this.players = players.sort(function(a, b) {
        return a.profile.competitive.rank < b.profile.competitive.rank;
      });
    }
  },
  methods: {
    refreshProfil(player) {
      playerServices.updatePlayer(player).then(d => {
        this.players = playerServices.getProfiles();
      });
    }
  }
};
</script>

<style scoped>

</style>
