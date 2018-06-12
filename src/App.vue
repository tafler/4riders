<template>
  <v-app>
    <v-navigation-drawer dark absolute v-model="sideNav">
      <v-list>
        <v-list-tile
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link">
          <v-list-tile-action><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark>
      <v-toolbar-side-icon
                          @click. stop="sideNav = !sideNav"
                          class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">4Riders</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">

          <v-icon left>{{ item.icon }}</v-icon>{{ item.title }}

        </v-btn>

      </v-toolbar-items>



    </v-toolbar>

    <main>
      <router-view></router-view>

    </main>

  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      sideNav: false,
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        {icon: 'lock_open', title: 'Sign in', link: '/signin'},
        {icon: 'face', title: 'Sign up', link: '/signup'}
      ]

      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'accessible_forward', title: 'Views', link: '/meetups'},
          {icon: 'room', title: 'New Ride', link: '/meetup/new'},
          {icon: 'person', title: 'Profile', link: '/profile'},
        ]
      }
      return menuItems
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null & this.$store.getters.user !==undefined
    }
  },

  name: 'App'
}
</script>
