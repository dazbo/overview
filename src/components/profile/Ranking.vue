<template>
    <div>
        <div v-if="rank" class="d-flex rank-container">
            <img v-bind:src="rankImage" v-bind:alt="nick || 'rankicon'" class="rankicon align-self-center">
            <div class="align-self-center rank-text">{{rank}}</div>
        </div>
        <div v-else class="d-flex rank-container nogame">
            <div class="align-self-center rank-text">&nbsp;</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ov-profile-ranking",
  // props: ['profil'],
  props: {
    picture: {
      type: String,
      required: true
    },
    nick: {
      type: String
    },
    rank: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    rankImage: function() {
      return (
        this.picture ||
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      );
    }
  }
};
</script>

<style>
.rankicon {
  height: 3rem;
}

div.rank-container {
  background-color: #561b73;
  width: 9rem;
}

div.rank-text {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
}

div.rank-container.nogame {
  background-color: gray;
}
</style>
