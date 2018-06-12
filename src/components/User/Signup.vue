<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex x12>
                    <v-text-field
                                name="email"
                                label="Mail"
                                id="email"
                                v-model="email"
                                type="email"
                                required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex x12>
                    <v-text-field
                                name="password"
                                label="Password"
                                id="password"
                                v-model="password"
                                type="password"
                                required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex x12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="confirmPassword"
                    :rules="[comparePasswords]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex x12>
                    <v-btn type="submit">Sign up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "Signup",
      data() {
        return{
          email: '',
          password: '',
          confirmPassword: ''
        }
      },
      computed: {
        comparePasswords() {
          return this.paassword !== this.confirmPassword ? 'Password dont equal': ''
        },
        user() {
          return this.$store.getters.user
        }
      },
      watch: {
        user (value) {
          if(value !== null && value !== undefined) {
            this.$router.push('/')
          }
        }
      },
      methods: {
        onSignup() {
          this.$store.dispatch('signUserUp', {email: this.email, password: this.password})

        }
      }
    }
</script>

<style scoped>

</style>
