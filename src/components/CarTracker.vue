<template>
  <div>
    <v-card v-if="carTracker" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-cogs</v-icon>
        <span class="title font-weight-light">Cartracker #{{carTracker.id}}</span>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Kilometers</v-flex>
          <v-flex xs6>{{carTracker.kilometers}}</v-flex>

          <v-flex xs6>Hardware</v-flex>
          <v-flex xs6>{{carTracker.hardware }}</v-flex>

          <v-flex xs6>Deleted</v-flex>
          <v-flex xs6>{{carTracker.isDeleted }}</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent" @click="edit(carTracker)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["carTracker"],
  metdhods: {
    edit(carTracker) {
      console.log(carTracker);
    }
  }
};
</script>

<style>
</style>
