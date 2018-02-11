<template>
    <li class="list-group-item">
        <div class="row">
            <div class="col-12 col-sm-5">
                <div class="form-group">
                    <label for="battletag">BattleTag</label>
                    <input type="text" class="form-control" id="battletag" placeholder="DazBolaim-2225" v-model="battletag">
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        BattleTag du joueur. Remplacer le # par un -. Sensible à la casse. Ex: DazBolaim-2225
                    </small>
                </div>
            </div>
            <div class="col-12 col-sm-5">
                <div class="form-group">
                    <input type="radio" name="platform" id="platformPC" value="pc" v-model="platform">
                    <label class="form-check-label" for="platformPC">PC</label>
                    <input type="radio" name="platform" id="platformXBox" value="xbl" v-model="platform">
                    <label class="form-check-label" for="platformXBox">XBox</label>
                    <input type="radio" name="platform" id="platformPSN" value="psn" v-model="platform">
                    <label class="form-check-label" for="platformPSN">PS Network</label>
                </div>
                <div class="form-group">
                    <input type="radio" name="region" id="regionUS" v-model="region" value="us">
                    <label class="form-check-label" for="regionUS">US</label>
                    <input type="radio" name="region" id="regionEU" v-model="region" value="eu">
                    <label class="form-check-label" for="regionEU">EU</label>
                    <input type="radio" name="region" id="regionASIA" v-model="region" value="asia">
                    <label class="form-check-label" for="regionASIA">ASIA</label>
                </div>
            </div>
            <div class="col-12 col-sm-2 text-right">
                <div class="btn-group" role="group">
                    <button :disabled="isBusy" type="button" class="btn btn-primary" @click="addProfile">Ajouter</button>
                </div>
            </div>
        </div>

        <div v-if="error">
            <p>{{error}}</p>
        </div>
    </li>
</template>

<script>
import * as playerServices from "@/data/playerServices";

export default {
  name: "ov-admin-add-player-row",
  data() {
    return {
      battletag: null,
      region: "eu",
      platform: "pc",
      isBusy: false,
      error: null
    };
  },
  methods: {
    addProfile() {
      const player = {
        battletag: this.battletag,
        platform: this.platform,
        region: this.region
      };
      playerServices
        .addProfile(player)
        .then(data => {
          //   this.$router.push("/");
          this.$emit("playerAdded", data);
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style>

</style>
