<template>
  <div>
    <v-snackbar
      flat
      v-for="(message, index) in messages"
      :key="index + message"
      v-model="message.on"
      bottom
      :color="message.color"
      right
      :timeout="3000"
    >
      {{ message.text }}
      <v-btn flat @click="close(message)">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  },
  methods: {
    close(message) {
      this.$store.dispatch("removeMessage", message);
    }
  }
};
</script>

<style>
</style>
