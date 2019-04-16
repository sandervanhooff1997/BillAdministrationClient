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
        <v-btn color="accent" @click="edit(rateCategory)">Edit</v-btn>
        <v-btn color="error" @click="edit(rateCategory)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["rateCategory"],
  metdhods: {
    edit(rateCategory) {
      console.log(rateCategory);
    },
    delete(rateCategory) {
      console.log(rateCategory);
    }
  }
};
</script>

<style>
</style>
