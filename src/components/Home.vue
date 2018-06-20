<template>
  <v-container>

     <v-layout row wrap>
       <v-flex xs12 sm6 class="text-xs-center text-sm-right">
         <v-btn large router to="/meetups" class="info">Explore Meetup</v-btn>
       </v-flex>
       <v-flex xs12 sm6 class="text-xs-center text-sm-left">
         <v-btn large router to="/meetup/new" class="info">Organize Meetup</v-btn>
       </v-flex>
     </v-layout>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
         <v-progress-circular  :size="70" :width="7" indeterminate color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs-12>
        <v-carousel v-if="!loading">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            style="cursor: pointer;"
            >
            <div class="title" @click="onLoadMeetup(meetup.id)">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awsome ride</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
  /* eslint-disable */
  export default {

    computed: {
      meetups() {
        return this.$store.getters.featuredMeetups
      },
      loading() {
        return this.$store.getters.loading
      }
    },

    methods: {
      onLoadMeetup(id) {
            // console.log('2 ' + id)
            this.$router.push('/meetups/' + id)
        }
    }
 }
</script>


<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    color: white;
    background-color: rgba(0,0,0, 0.5);
    font-size: 2em;
    padding-bottom: 5px;
  }
</style>
