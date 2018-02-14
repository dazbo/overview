<template>
    <div class="container-fluid">
        <div class="row" v-if="profile">
            <div class="col-12">
                <h1>
                    <img v-bind:src="portrait" class="avatar" @error="imgOnerror"> {{profile.username}}
                    <small>{{battletag}}</small>
                </h1>
            </div>
            <div class="col-12">
                <h2>Compétitives</h2>
            </div>

            <div class="col-12 col-sm-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        Statistiques
                        <span>
                            <img :src="rankImage" :alt="profile.competitive.rank" class="inline-rank">
                            <b>{{profile.competitive.rank}}</b>
                        </span>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Temps</b>
                            <span>{{profile.playtime.competitive | timeTranslate}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Victoires</b>
                            <span>{{profile.games.competitive.won||0}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Défaites</b>
                            <!-- <span>{{profile.games.competitive.lost|| (profile.games.competitive | fixedLostGame) || 0}}</span> -->
                            <span>{{ profile.games.competitive | fixedLostGame }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Nul</b>
                            <span>{{profile.games.competitive.draw||0}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Total</b>
                            <span>{{profile.games.competitive.played||0}}</span>
                        </li>
                        <li class="list-group-item ">
                            <div class="progress">
                                <div class="progress-bar bg-success" :style="{width: type.competitive.Offensifpercent + '%'}" :title="'Offensif (' + type.competitive.Offensifpercent + ')'">
                                    Offensif
                                </div>
                                <div class="progress-bar bg-info" :style="{width: type.competitive.Défensifpercent + '%'}" :title="'Défensif (' + type.competitive.Défensifpercent + ')'">
                                    Défensif
                                </div>
                                <div class="progress-bar bg-warning" :style="{width: type.competitive.Tankpercent + '%'}" :title="'Tank (' + type.competitive.Tankpercent + ')'">
                                    Tank
                                </div>
                                <div class="progress-bar bg-danger" :style="{width: type.competitive.Supportpercent + '%'}" :title="'Support (' + type.competitive.Supportpercent + ')'">
                                    Support
                                </div>
                            </div>
                        </li>

                        <template v-for="t in type.competitiveValues">
                            <li :key="t.type" class="list-group-item d-flex justify-content-between align-items-center">
                                <b>{{t.type}}</b>
                                <span>{{t.value||0}} min</span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-sm-6">
                <div class="card">
                    <div class="card-header">Temps de jeu par héro</div>
                    <ul class="list-group">
                        <template v-for="hero in heroes.competitive">
                            <li :key="hero.hero" class="list-group-item d-flex justify-content-between align-items-center">
                                <!-- hero img played -->
                                <span>
                                    <img :src="hero.img" alt="hero.hero" class="hero"> {{hero.hero}}
                                </span>
                                <span>
                                    {{hero.played | timeTranslate}}
                                </span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <div class="col-12">
                <h2>Quick play</h2>
            </div>

            <div class="col-12 col-sm-6">
                <div class="card">
                    <div class="card-header">Statistiques</div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Temps</b>
                            <span>{{profile.playtime.quickplay | timeTranslate}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <b>Victoires</b>
                            <span>{{profile.games.quickplay.won||0}}</span>
                        </li>

                        <li class="list-group-item ">
                            <div class="progress">
                                <div class="progress-bar bg-success" :style="{width: type.quickplay.Offensifpercent + '%'}" :title="'Offensif (' + type.quickplay.Offensifpercent + ')'">
                                    Offensif
                                </div>
                                <div class="progress-bar bg-info" :style="{width: type.quickplay.Défensifpercent + '%'}" :title="'Défensif (' + type.quickplay.Défensifpercent + ')'">
                                    Défensif
                                </div>
                                <div class="progress-bar bg-warning" :style="{width: type.quickplay.Tankpercent + '%'}" :title="'Tank (' + type.quickplay.Tankpercent + ')'">
                                    Tank
                                </div>
                                <div class="progress-bar bg-danger" :style="{width: type.quickplay.Supportpercent + '%'}" :title="'Support (' + type.quickplay.Supportpercent + ')'">
                                    Support
                                </div>
                            </div>
                        </li>

                        <template v-for="t in type.quickplayValues">
                            <li :key="t.type" class="list-group-item d-flex justify-content-between align-items-center">
                                <b>{{t.type}}</b>
                                <span>{{t.value||0}} min</span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-sm-6 ">
                <div class="card">
                    <div class="card-header">Temps de jeu par héro</div>
                    <ul class="list-group">
                        <template v-for="hero in heroes.quickplay">
                            <li :key="hero.hero" class="list-group-item d-flex justify-content-between align-items-center">
                                <!-- hero img played -->
                                <span>
                                    <img :src="hero.img" alt="hero.hero" class="hero"> {{hero.hero}}
                                </span>
                                <span>
                                    {{hero.played | timeTranslate}}
                                </span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import * as playerServices from "../../data/playerServices";
import heroClassification from "../../data/heroclassification";

function extractHeroTimeAndType(source) {
  const hero = source.filter(s => s.played !== "--").map(h => {
    const played = h.played.split(" ");
    let converter = 1;
    if (/hour?/i.test(played[1])) {
      converter = 60;
    }
    h.time = parseInt(played[0], 10) * converter;
    return h;
  });
  const type = hero.reduce(
    (acc, h) => {
      const type = (heroClassification[h.hero] || { type: "Unknown" }).type;
      acc[type] += h.time;
      acc.Total += h.time;
      return acc;
    },
    {
      Tank: 0,
      Support: 0,
      Offensif: 0,
      Défensif: 0,
      Total: 0
    }
  );
  const typeArray = [];
  for (const key in type) {
    if (type.hasOwnProperty(key)) {
      const value = type[key];
      typeArray.push({ type: key, value });
      type[key + "percent"] = 100 * value / type.Total;
    }
  }

  typeArray.sort((a, b) => (a.value < b.value ? 1 : -1));

  return { hero, type, typeArray };
}

export default {
  name: "ov-profile-detail",
  props: {
    battletag: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      player: null,
      stats: null,
      profile: null,
      portrait: "",
      rankImage: "",
      heroes: {
        quickplay: [],
        competitive: []
      },
      type: {
        quickplay: {
          Tank: 0,
          Support: 0,
          Offensif: 0,
          Défensif: 0,
          Total: 0
        },
        quickplayValues: [],
        competitive: {
          Tank: 0,
          Support: 0,
          Offensif: 0,
          Défensif: 0,
          Total: 0
        },
        competitiveValues: []
      }
    };
  },
  created() {
    playerServices.getProfileByBatteTag(this.battletag).then(data => {
      if (data) {
        this.profile = data.profile;
        this.stats = data.stats;
        this.portrait = data.portrait || "";
        this.rankImage =
          this.profile.competitive.rank_img ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

        if (data.stats.stats && data.stats.stats.top_heroes) {
          const competitive = extractHeroTimeAndType(
            data.stats.stats.top_heroes.competitive
          );
          this.heroes.competitive = competitive.hero;
          this.type.competitive = competitive.type;
          this.type.competitiveValues = competitive.typeArray;

          const quickplay = extractHeroTimeAndType(
            data.stats.stats.top_heroes.quickplay
          );
          this.heroes.quickplay = quickplay.hero;
          this.type.quickplay = quickplay.type;
          this.type.quickplayValues = quickplay.typeArray;
        }
      }
    });
  },

  methods: {
    imgOnerror(args) {
      args.srcElement.onerror = null;
      args.srcElement.src =
        "https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x02500000000002F7.png";
    }
  },
  filters: {
    timeTranslate(t) {
      return (t || "").replace(/ hours?$/, " h").replace(/ minutes?$/, " min");
    },
    fixedLostGame(game) {
      const { won = 0, lost = 0, draw = 0, played = 0 } = game;
      return played - won - draw;
    }
  }
};
</script>

<style scoped>
img.inline-rank,
img.hero,
img.avatar {
  max-height: 1em;
}
</style>
