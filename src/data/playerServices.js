import axios from "axios";
axios.defaults.baseURL = 'https://ow-api.herokuapp.com/'

const PLAYERS = 'players';

export function getProfiles() {
  const players = localStorage.getItem(PLAYERS);
  return players ? JSON.parse(players) : [];
}

export function getProfile(player) {
  return getProfiles().find(p => player.battletag == p.battletag);
}

export function getProfileByBatteTag(battletag) {
  const btagRgx = new RegExp(battletag, 'i');
  const profile = getProfiles().find(p => btagRgx.test(p.battletag));
  return Promise.resolve(profile)
}

export function addProfile(player) {
  let players = getProfiles();
  if (!Array.isArray(players)) {
    players = [];
  }
  // Check on battletag only?
  let storedPlayer = players.find(p => p.battletag == player.battletag && p.region == player.region && p.platform == player.platform);
  if (!storedPlayer) {
    player.modifiedOn = Date.now();
    players.push(player);
  } else {
    storedPlayer.modifiedOn = Date.now();
  }
  localStorage.setItem(PLAYERS, JSON.stringify(players));
  return updatePlayer(player)
}

export function savePlayer(player) {
  const players = getProfiles();
  let existingPlayer = true;
  let storedPlayer = players.find(p => p.battletag == player.battletag && p.region == player.region && p.platform == player.platform);
  if (!storedPlayer) {
    existingPlayer = false;
    storedPlayer = {
      battletag: player.battletag,
      platform: player.platform,
      region: player.region
    }
  }
  storedPlayer.modifiedOn = Date.now();
  storedPlayer.stats = player.stats;
  storedPlayer.profile = player.profile;
  if (!existingPlayer)
    players.push(existingPlayer)
  localStorage.setItem(PLAYERS, JSON.stringify(players));
}

export function updatePlayer(player) {
  const {
    battletag,
    platform,
    region
  } = player;

  if (battletag && platform && region) {
    return axios.get(`stats/${platform}/${region}/${battletag}`)
      .then(resp => {
        const storedPlayer = getProfile(player);
        storedPlayer.stats = resp.data;
        return storedPlayer;

      }).then(storedPlayer => {
        return axios.get(`profile/${platform}/${region}/${battletag}`)
          .then(resp => {
            storedPlayer.profile = resp.data;
            savePlayer(storedPlayer);
            return Promise.resolve(storedPlayer);
          });
      });
  } else {
    return Promise.reject('invalid input');
  }
}


export function removePlayer(player) {
  const players = getProfiles();
  const playerIndex = players.findIndex(p => player.battletag == p.battletag);
  if (playerIndex != -1) {
    players.splice(playerIndex);
    localStorage.setItem(PLAYERS, JSON.stringify(players));
  }
  return Promise.resolve(playerIndex);
}
