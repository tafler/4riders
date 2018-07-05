// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import { value } from '../apiKey'
import { store } from './store'
import AlertCmp from './components/Shared/Alert'
import 'vuetify/dist/vuetify.min.css'
import DateFilter from './filters/date'
import EditMeetpDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetpDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import EditMeetpTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog'

Vue.use(Vuetify, { theme: {
  primary: '#e3aa8a',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetpDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetpDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetpTimeDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: value,
      authDomain: 'riders-99582.firebaseapp.com',
      databaseURL: 'https://riders-99582.firebaseio.com',
      projectId: 'riders-99582',
      storageBucket: 'gs://riders-99582.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
