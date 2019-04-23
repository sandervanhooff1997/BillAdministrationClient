<template>
  <div>
    <v-card v-if="rateCategory" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-euro-sign</v-icon>
        <span class="title font-weight-light">Rate Category #{{rateCategory.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="rateCategory = null">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Name</v-flex>
          <v-flex xs6>{{rateCategory.name}}</v-flex>

          <v-flex xs6>Price / KM</v-flex>
          <v-flex xs6>&euro; {{rateCategory.price }}</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <edit-rate-category></edit-rate-category>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    rateCategory() {
      return this.$store.getters.rateCategory;
    }
  }
};
</script>

<style>
</style>
