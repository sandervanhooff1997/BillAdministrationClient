<template>
  <div>
    <v-card v-if="vehicle" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-car</v-icon>
        <span class="title font-weight-light">Vehicle #{{vehicle.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="vehicle = null">
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

          <owner-credentials
            class="mt-2 ml-4"
            v-if="vehicle.ownerCredentials"
            :owner-credentials="vehicle.ownerCredentials"
          ></owner-credentials>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent" @click="edit(vehicle)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["vehicle"],
  methods: {
    edit(vehicle) {
      console.log(vehicle);
    }
  }
};
</script>

<style>
</style>
