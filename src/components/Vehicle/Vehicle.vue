<template>
  <div>
    <v-card v-if="vehicle" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-car</v-icon>
        <span class="title font-weight-light">Vehicle #{{vehicle.id}}</span>
        <v-spacer></v-spacer>
        <v-btn v-if="!v" icon @click="hide()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Licence plate</v-flex>
          <v-flex xs6>{{vehicle.licencePlate}}</v-flex>

          <rate-category class="mt-2 ml-4" v-if="vehicle.rateCategory" :rc="vehicle.rateCategory"></rate-category>

          <car-tracker class="mt-2 ml-4" v-if="vehicle.carTracker" :ct="vehicle.carTracker"></car-tracker>

          <v-tabs v-model="active" color="primary" dark slider-color="warning">
            <v-tab
              v-for="(ownerCredential, index) in vehicle.ownerCredentials"
              :key="`tab-${index}`"
              ripple
            >{{ownerCredential.name}}</v-tab>
            <v-tab-item
              v-for="(ownerCredential, index) in vehicle.ownerCredentials"
              :key="`tab-item-${index}`"
            >
              <owner-credential class="mt-2 ml-4" :oc="ownerCredential"></owner-credential>
            </v-tab-item>
          </v-tabs>

          <bills v-if="bills" :bs="bills" class="mt-2"></bills>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <!-- <v-btn color="accent" @click="edit(vehicle)">Edit</v-btn> -->
        <v-btn color="accent" @click="recalculate(bill)">Recalculate bill</v-btn>
        <v-btn color="accent" @click="changeCarTracker()">New cartracker</v-btn>
        <v-btn color="accent" @click="getBillsByVehicleId()" :disabled="bills">Bills</v-btn>
        <v-menu offset-y class="mr-2">
          <template v-slot:activator="{ on }">
            <v-btn
              color="accent"
              dark
              :disabled="!ownerCredentials || !ownerCredentials.length"
              v-on="on"
            >Transfer ownership</v-btn>
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
import Bills from "@/views/Bills";

export default {
  props: ["v"],
  components: { Bills },
  data() {
    return {
      active: null,
      ownerCredentials: null,
      bills: null
    };
  },
  methods: {
    hide() {
      this.$store.commit("setVehicle", null);
    },
    transferOwnership(ownerCredential) {
      let payload = {
        vehicleId: this.vehicle.id,
        ocId: ownerCredential.id
      };

      this.$store
        .dispatch("transferOwnershipVehicle", payload)
        .then(() => {
          this.vehicle.ownerCredentials.push(ownerCredential);
          this.getOwnerCredentialsUnused();
          this.$store.dispatch("successMessage", "Ownership transferred");
        })
        .catch(err => {
          this.$store.dispatch("errorMessage", "Error transferring ownership");
        });
    },
    getOwnerCredentialsUnused() {
      this.$store
        .dispatch("getOwnerCredentialsUnused")
        .then(ownerCredentials => (this.ownerCredentials = ownerCredentials))
        .catch(err => {
          this.$store.dispatch(
            "errorMessage",
            "Error getting ownercredentials"
          );
        });
    },
    getBillsByVehicleId() {
      this.$store
        .dispatch("getBillsByVehicleId", this.vehicle.id)
        .then(bills => {
          if (bills) this.bills = bills;
        })
        .catch(err => {
          this.$store.dispatch("errorMessage", "Error getting vehicle bills");
        });
    }
  },
  watch: {
    vehicle(val) {
      if (val) {
        this.bills = null;
        this.getOwnerCredentialsUnused();
      }
    }
  },
  computed: {
    vehicle() {
      if (this.v) return this.v;

      return this.$store.getters.vehicle;
    }
  }
};
</script>

<style>
</style>
