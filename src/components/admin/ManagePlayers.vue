<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="player in players" :key="player.battletag">
        <div class="row">
          <div class="col-6 col-sm">
            <strong>{{player.battletag}}</strong>
          </div>
          <div class="col-6 col-sm">
            <timeago :since="player.modifiedOn"></timeago>
          </div>
          <div class="col-12 col-sm text-right">
            <div class="btn-group" role="group">
              <button :disabled="isBusy" type="button" class="btn btn-primary" @click="refreshProfil({battletag:player.battletag, region:player.region, platform:player.platform })">Mettre à jour</button>
              <button :disabled="isBusy" type="button" class="btn btn-danger" @click="removeProfil({battletag:player.battletag, region:player.region, platform:player.platform })">Supprimer</button>
            </div>
          </div>
        </div>
      </li>
      <AddPlayerRow @playerAdded="getProfiles" />
    </ul>
    <div class="text-right">
      <button :disabled="isBusy" type="button" class="btn btn-light" @click="updateAll">Tout mettre à jour</button>
      <button :disabled="isBusy" type="button" class="btn btn-light" data-toggle="collapse" data-target="#collapseExample">Import/Export</button>
    </div>
    <div class="collapse" id="collapseExample">
      <div class="card">
        <div class="card-body">
          <textarea class="form-control" name="import" id="import" rows="8" v-model="currentPlayers" />
        </div>
        <div class="card-body">
          <a href="#" class="card-link" @click="importPlayers">Import</a>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import * as playerServices from "@/data/playerServices";
import AddPlayerRow from "./AddPlayerRow";

export default {
  name: "ov-admin-manage-player",
  components: { AddPlayerRow },
  data() {
    return {
      players: [],
      isBusy: false,
      currentPlayers: []
    };
  },
  mounted() {
    this.getProfiles();
  },
  methods: {
    getProfiles() {
      this.players = playerServices.getProfiles().map(p => {
        return {
          battletag: p.battletag,
          region: p.region,
          platform: p.platform,
          modifiedOn: new Date(p.modifiedOn)
        };
      });
      this.currentPlayers = this.players
        .map(p => [p.battletag, p.region, p.platform].join(";"))
        .join("\n");
    },
    refreshProfil(player) {
      this.isBusy = true;
      playerServices.updatePlayer(player).then(data => {
        this.getProfiles();
        this.isBusy = false;
      });
    },
    removeProfil(player) {
      this.isBusy = true;
      playerServices.removePlayer(player).then(id => {
        if (id != -1) this.getProfiles();
        this.isBusy = false;
      });
    },
    updateAll() {
      this.isBusy = true;
      const tasks = [];
      this.players.forEach(p => tasks.push(playerServices.updatePlayer(p)));
      Promise.all(tasks).then(result => this.getProfiles());
      this.isBusy = false;
    },
    importPlayers() {
      this.currentPlayers.split("\n").forEach(p => {
        const [battletag, region, platform] = p.split(";");
        const player = { battletag, platform, region };
        playerServices
          .addProfile(player)
          .then(data => {
            this.$emit("playerAdded", data);
          })
          .catch(err => {
            this.error = err;
          });
      });
    }
  }
};
</script>

<style>
.col-free {
  flex-grow: 0;
}
</style>
