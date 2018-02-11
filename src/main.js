// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTimeago from './data/timeago'

Vue.config.productionTip = false

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'fr-FR',
  locales: {
    // you will need json-loader in webpack 1
    'fr-FR':[
      "à l'instant",
      ["il y a %s seconde", "il y a %s secondes"],
      ["il y a %s minute",  "il y a %s minutes"],
      ["il y a %s heure",   "il y a %s heures"],
      ["il y a %s jour",    "il y a %s jours"],
      ["il y a %s semaine", "il y a %s semaines"],
      ["il y a %s mois",    "il y a %s mois"],
      ["il y a %s an",      "il y a %s ans"]
    ]
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
