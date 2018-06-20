<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <h2>Create New Meetup</h2>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12>
      <form @submit.prevent="onCreateMeetup">
        <v-layout row>
          <v-flex x12 sm6 offset-sm3>
            <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              requierd
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex x12 sm6 offset-sm3>
            <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              requierd
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex x12 sm6 offset-sm3>
            <v-text-field
              name="imageUrl"
              label="Image URL"
              id="imageUrl"
              v-model="imageUrl"
              requierd
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex x12 sm6 offset-sm3>
            <img :src="imageUrl" height="300" width="600">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex x12 sm6 offset-sm3>
            <v-text-field
              name="description"
              label="Description"
              id="description"
              v-model="description"
              multi-line
              requierd
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-date-picker v-model="date"
                            type="date">
            </v-date-picker>
          </v-flex>
        </v-layout>
        <v-layout row class="mb-2">
          <v-flex xs12 sm6 offset-sm3>
            <v-time-picker
              v-model="time"
              format="24hr"
            ></v-time-picker>
          </v-flex>
        </v-layout>{{ submittableDateTime }}
        <v-layout row>
          <v-flex xs12>
            <v-btn class="primary"
                   :disabled="!formIsValid"
                    type="submit">Create Meetup</v-btn>
          </v-flex>
        </v-layout>

      </form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
    export default {
      name: "CreateMeetup",
      data() {
        return {
          title: '',
          location: '',
          imageUrl: '',
          description: '',
          date: '',
          time: new Date()
        }
      },
      mounted() {
        // this.date = new Date()
      },
      computed: {
        formIsValid () {
          return this.title !== ''
              && this.location !== ''
              && this.imageUrl !== ''
              && this.description !== ''
        },
        submittableDateTime () {
          const date = new Date(this.date)
          if(typeof(this.time) === 'string'){
            const hours = this.time.match(/^(\d+)/)[1]
            const minutes = this.time.match(/:(\d+)/)[1]
            date.setHours(hours)
            date.setMinutes(minutes)
          } else {
            date.setHours(this.time.getHours())
            date.setMinutes(this.time.getMinutes())
          }
          return date;
        }
      },
      methods: {
        onCreateMeetup() {
          if(!this.formIsValid){
            return
          }
          const meetupData = {
            title : this.title,
            location : this.location,
            description: this.description,
            imageUrl: this.imageUrl,
            date: this.submittableDateTime,
            // id: this.id
          }
          this.$store.dispatch('createMeetup', meetupData)
          this.$router.push('/meetups')
        }
      }
    }
</script>

<style scoped>

</style>
