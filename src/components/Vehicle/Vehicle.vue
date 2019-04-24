<template>
  <div>
    <v-card v-if="vehicle" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-car</v-icon>
        <span class="title font-weight-light">Vehicle #{{vehicle.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="hide()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Licence plate</v-flex>
          <v-flex xs6>{{vehicle.licencePlate}}</v-flex>

          <rate-category class="mt-2 ml-4" v-if="vehicle.rateCategory" :rc="vehicle.rateCategory"></rate-category>

          <car-tracker class="mt-2 ml-4" v-if="vehicle.carTracker" :ct="vehicle.carTracker"></car-tracker>

          <owner-credential
            class="mt-2 ml-4"
            v-if="vehicle.ownerCredentials"
            :oc="vehicle.ownerCredentials"
          ></owner-credential>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent" @click="edit(vehicle)">Edit</v-btn>
        <v-btn color="accent" @click="recalculate(bill)">Recalculate bill</v-btn>
        <v-menu offset-y class="mr-2">
          <template v-slot:activator="{ on }">
            <v-btn color="accent" dark v-on="on">Transfer ownership</v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(ownerCredential, index) in ownerCredentials"
              :key="index"
              @click="transferOwnership(ownerCredential)"
            >
              <v-list-tile-title>{{ ownerCredential.name}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["v"],
  methods: {
    edit(vehicle) {
      vehicle;
    },
    hide() {
      this.$store.commit("setVehicle", null);
    },
    transferOwnership(ownerCredential) {}
  },
  computed: {
    vehicle() {
      if (this.v) return this.v;

      return this.$store.getters.vehicle;
    },
    ownerCredentials() {
      return this.$store.getters.ownerCredentials;
    }
  },
  mounted() {
    this.$store.dispatch("getOwnerCredentials");
  }
};
</script>

<style>
</style>
