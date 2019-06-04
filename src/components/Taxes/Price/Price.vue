<template>
  <div>
    <v-card v-if="price" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-euro-sign</v-icon>
        <span class="title font-weight-light">Price #{{price.id}}</span>
        <v-spacer></v-spacer>
        <v-btn v-if="!p" icon @click="hide()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Amount</v-flex>
          <v-flex xs6>{{price.price}}</v-flex>

          <v-flex xs6>Begin</v-flex>
          <v-flex xs6>{{price.beginFormatted | date}}</v-flex>

          <v-flex xs6>End</v-flex>
          <v-flex xs6>{{price.endFormatted | date}}</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions v-if="$userHasRole('admin')"></v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["p"],
  methods: {
    hide() {
      this.$store.commit("setPrice", null);
    }
  },
  computed: {
    price() {
      if (this.p) return this.p;

      return this.$store.getters.price;
    }
  }
};
</script>

<style>
</style>
