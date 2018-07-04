<template>
  <v-alert @click="onClose" type="success" error dismissible :value="true">
    {{ text }}
  </v-alert>

</template>

<script>
    export default {
      name: 'Alert',
      props: ['text'],
      methods: {
          onClose() {
            this.$emit('dismissed')
          },
      }
    }
</script>

<style scoped>

</style>
