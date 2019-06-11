<template>
  <div>
    <v-card v-if="road" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-road</v-icon>
        <span class="title font-weight-light">Road #{{road.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="hide()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Address</v-flex>
          <v-flex xs6>{{road.name}}</v-flex>

          <v-flex xs6>Price</v-flex>
          <v-flex xs6>
            &euro; {{road.price.price }}
            <br>
            since {{road.price.beginFormatted}}
          </v-flex>

          <v-flex xs6>Price (rush hour)</v-flex>
          <v-flex xs6>
            &euro; {{road.rushPrice.price }}
            <br>
            since {{road.rushPrice.beginFormatted}}
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions v-if="$userHasRole('admin')">
        <add-price></add-price>
        <add-price class="ml-2" :rush-hour="true"></add-price>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    hide() {
      this.$store.commit("setRoad", null);
    }
  },
  computed: {
    road() {
      return this.$store.getters.road;
    }
  }
};
</script>

<style>
</style>
