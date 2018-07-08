import * as firebase from 'firebase'

export default {
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
    ]
  },

  mutations: {
    
    setLoadedMeetups(state, payload){
      state.loadedMeetups = payload
    },
    createMeetup(state, payload){
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if(payload.title) {
        meetup.title = payload.title
      }
      if(payload.description) {
        meetup.description = payload.description
      }
      if(payload.date) {
        meetup.date = payload.date
      }

    },
  },

  actions: {
    
    loadMeetups({commit}) {
      commit('setLoading', true)
      firebase.database().ref('rides').once('value')
      .then(res => {
        const rides = []
        const obj = res.val()
        for(let key in obj){
          rides.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoading', false)
        commit('setLoadedMeetups', rides)      
        

      })
      .catch(e => {
        console.log(e) 
        commit('setLoading', true) 
      })      
    },
    createMeetup({ commit, getters }, payload){
      const rides = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('rides').push(rides)
        .then(res => {
          key = res.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('rides/' + key + ext).put(payload.image)
        })
        .then(fileData =>{
          fileData.ref.getDownloadURL()
            .then(url => {
              return firebase.database().ref('rides').child(key).update({imageUrl: url})
        })})
        .then(() => {
          commit('createMeetup', {
            ...rides,
            imageUrl: imageUrl,
            id: key,
            
            })

        })
        .catch(e => console.log(e))
      },
    updateMeetupData({ commit }, payload){
      commit('setLoading', true)
      const updateObj = {}
      if(payload.title){
        updateObj.title = payload.title;
      }
      if(payload.description){
        updateObj.description = payload.description;
      }
      if(payload.date){
        updateObj.date = payload.date;
      }
      firebase.database().ref('rides').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch( e => {
          console.log(e)
          commit('setLoading', false)
        })      
    },   

  },

  getters: {
    loadedMeetups ( state) {
      return state.loadedMeetups.sort(( meetupA, meetupB ) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups ( getters ) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup ( state ) {
      return ( meetupId ) => {
        return state.loadedMeetups.find(( meetup ) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
