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
      isBusy: false
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
    }
  }
};
</script>

<style>
.col-free {
  flex-grow: 0;
}
</style>
