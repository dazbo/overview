<template>
  <div class="row">
    <div class="col">
      <router-link class="d-flex flex-wrap user" :to="'/profile/' + profil.battletag ">
        <!-- <div class="user-rank">{{i+1}}</div> -->
        <Ranking class="user-ranking" :picture="rankimg" :nick="profil.profile.username" :rank="rating">/</Ranking>
        <div class="user-portrait">
          <img v-bind:src="portrait" class="avatar" @error="imgOnerror">
        </div>
        <div class="user-profil">
          <span class="user-nick">{{name}}</span>
        </div>
        <div class="user-heroes">
          <div class="d-flex">
            <span v-for="tophero in topheroes" :key="tophero.hero" :title="tophero.hero + ' - ' + tophero.played ">
              <img class="tophero-picture" :src="tophero.img" :alt="tophero.hero">
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Ranking from "./Ranking";
export default {
  name: "ov-profile-row",
  components: { Ranking },
  props: {
    profil: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: null,
      portrait: null,
      rankimg: null,
      rating: null,
      played: 0,
      won: 0,
      topheroes: []
    };
  },
  created() {
    const s = this.profil.stats;
    this.name = s.username;
    this.portrait = s.portrait || "";
    this.rankimg = this.profil.profile.competitive.rank_img || "";
    this.rating = this.profil.profile.competitive.rank || "";
    this.played = (
      s.stats.game.competitive.find(s => s.title === "Games Played") || {
        value: null
      }
    ).value;
    this.won = (
      s.stats.game.competitive.find(s => s.title === "Games Won") || {
        value: null
      }
    ).value;
    this.topheroes = s.stats.top_heroes.competitive.slice(0, 3);
  },
  methods: {
    refresh() {
      const { battletag, region, platform } = this.profil;
      this.$emit("profilRefresh", { battletag, region, platform });
    },
    imgOnerror(args) {
      args.srcElement.onerror = null;
      args.srcElement.src =
        "https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x02500000000002F7.png";
    }
  }
};
</script>

<style scoped>

a:hover {
    color: inherit;
    text-decoration: none;
}

.tophero-picture {
  max-height: 3rem;
}

.user {
  margin-bottom: 0.25rem;
  background: rgba(255, 255, 255, 0.66);
  border-bottom: 3px solid #d4d0d5;
  transition: transform 0.15s ease-out 0s;
  transform: scale(0.97);
}

.user:hover {
  transform: translate3d(-3px, -3px, -20px) scale(1);
}

.user > * {
  flex: 0;
  align-self: center;
}

.user-rank,
.user-nick {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: bold;
}

.user-rank {
  flex: 0 0 auto;
  width: 3rem;
  height: 2rem;
  text-align: center;
  color: #848484;
  padding: 0;
}

.user-ranking {
  flex: 0 0 auto;
}

.user-profil {
  flex: 1 0 auto;
}

.avatar {
  max-height: 3rem;
  width: 3rem;
  flex: 0 0 auto;
}

.user-nick {
  text-transform: uppercase;
  font-weight: bold;
  margin-left: 1rem;
  color: #28354f;
}

.user-actions {
  display: none;
}

.user:hover .user-actions {
  display: inline-block;
}

.user-heroes {
  flex: 0 1 auto;
}

.user-heroes > div.d-flex {
  justify-content: flex-end;
  align-self: center;
}

.user-portrait {
  max-height: 3rem;
}

@media (max-width: 767px) {
  .user-ranking,
  .user-rank {
    width: 100%;
    flex: 0 0 25%;
  }

  .user-portrait {
    flex: 1 0 auto;
    text-align: right;
  }

  /* .avatar {
    max-height: 6rem;
    width: 6rem;
    flex: 0 0 auto;
  } */

  .user-profil {
    width: 100%;
    text-align: center;
  }

  .user-heroes {
    width: 100%;
  }
  .user-heroes > div.d-flex {
    justify-content: space-between;
  }
}

@media (max-width: 1023px) {
  .user:hover .user-actions {
    display: block;
  }
}
</style>
