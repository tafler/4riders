import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://rollerblade.nl/files/4529/TS7A7577_copie_Rollerblade_Team_by_Greg_Mirzoyan_-_Berlin_2016.jpg',
        id: 'asdasdawdda555',
        title: 'New Roller ride in moscow',
        date: new Date(),
        location: 'Moscow',
        description: 'Ride on Moscow'
      },
      {
        imageUrl: 'https://a2.pmark.ru/data/mv0000022091pn/images/news/2010/%D0%9E%20%D0%B1%D0%BB%D0%B0%D0%B3%D0%BE%D1%82%D0%B2%D0%BE%D1%80%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B5%20%D0%9B%D0%B5%D1%82%D0%BD%D0%B5%D0%B9%20%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%BE%D0%B9%20%D1%88%D0%BA%D0%BE%D0%BB%D1%8B%20Roller%20Pride/%D0%B4%D0%B5%D1%82%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%82%D1%8C%D1%81%D1%8F.jpg',
        id: 'aasdgrngrm,vbv7w8df9ag4',
        title: 'Roller school ride in VAO moscow',
        date: new Date(),
        location: 'Moscow',
        description: 'Ride on Moscow'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup(state, payload){
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup({ commit }, payload){
      const meetup ={
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date,
        id: 'asdasdasdwdwd2'

      }
      commit('createMeetup', meetup)
    },
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        ).catch((e) => console.log(e))

    },
    signUserIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
              user => {
                const newUser = {
                  id: user.uid,
                  registeredMeetups: []
                }
                commit('setUser', newUser)
              }
        ).catch((e) => console.log(e))

    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0,5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user(state) {
      return state.user
    }
  }

})