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

          <rate-category
            class="mt-2 ml-4"
            v-if="vehicle.rateCategory"
            :rate-category="vehicle.rateCategory"
          ></rate-category>

          <car-tracker
            class="mt-2 ml-4"
            v-if="vehicle.carTracker"
            :car-tracker="vehicle.carTracker"
          ></car-tracker>

          <owner-credential
            class="mt-2 ml-4"
            v-if="vehicle.ownerCredentials"
            :owner-credentials="vehicle.ownerCredentials"
          ></owner-credential>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent" @click="edit(vehicle)">Edit</v-btn>
        <v-btn color="accent" @click="recalculate(bill)">Recalculate bill</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    edit(vehicle) {
      vehicle;
    },
    hide() {
      this.$store.commit("setVehicle", null);
    }
  },
  computed: {
    vehicle() {
      return this.$store.getters.vehicle;
    }
  }
};
</script>

<style>
</style>
