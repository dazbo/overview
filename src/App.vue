<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" to="/" title="Suivi des statistiques de Pingouins &amp; des Bretzels">
        <i class="ohi-zenyatta"></i>&nbsp;
        <strong>Over</strong>View
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main>
      <transition name="fade">
        <router-view class="router"></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {
  background-color: #e7e1e3;
}

.router {
  margin-top: 70px;
}

.router {
  transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1);
}

main {
  margin: 0 2em;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
</style>
