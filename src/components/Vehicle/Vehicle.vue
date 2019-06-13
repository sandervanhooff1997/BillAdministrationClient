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
        <v-timeline v-if="ownershipHistory">
          <v-btn color="accent" @click="ownershipHistory = null">close</v-btn>
          <v-timeline-item
            v-for="owner in ownershipHistory"
            :key="owner.id"
            color="red lighten-2"
            large
          >
            <template v-slot:opposite>
              <span>
                {{owner.beginFormatted}}
                <template v-if="owner.end">until {{owner.endFormatted}}</template>
              </span>
            </template>
            <owner-credential :oc="owner.ownerCredentials"></owner-credential>
          </v-timeline-item>
        </v-timeline>
        <v-layout row wrap v-if="!ownershipHistory">
          <v-flex xs6>Licence plate</v-flex>
          <v-flex xs6>{{vehicle.licencePlate}}</v-flex>
          <v-flex xs6>Emission type</v-flex>
          <v-flex xs6>{{vehicle.vehicleType}}</v-flex>
          <v-flex xs12 md6>
            <v-tabs v-model="activeCarTracker" color="primary" dark slider-color="warning">
              <v-tab
                v-for="(carTracker, index) in vehicle.carTrackers"
                :key="`tab-ct-${index}`"
                ripple
              >{{carTracker.hardware}}</v-tab>
              <v-tab-item
                v-for="(carTracker, index) in vehicle.carTrackers"
                :key="`tab-item-ct-${index}`"
              >
                <car-tracker class="mt-2 ml-4" v-if="carTracker" :ct="carTracker"></car-tracker>
              </v-tab-item>
            </v-tabs>
          </v-flex>
          <v-flex xs12 md6>
            <owner-credential class="mt-2 ml-4" :oc="vehicle.ownerCredentials"></owner-credential>
          </v-flex>
          <v-flex xs12>
            <bills v-if="bills" :bs="bills" class="mt-2"></bills>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-menu offset-y class="mr-2">
          <template v-slot:activator="{ on }">
            <v-btn color="accent" dark :disabled="!carTrackers || !carTrackers.length" v-on="on">
              Change Cartracker
              <v-icon right small>fas fa-pencil-alt</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(carTracker, index) in carTrackers"
              :key="index"
              @click="changeCarTracker(carTracker)"
            >
              <v-list-tile-title>{{ carTracker.hardware}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu offset-y class="mr-2">
          <template v-slot:activator="{ on }">
            <v-btn
              color="accent"
              dark
              :disabled="!ownerCredentials || !ownerCredentials.length"
              v-on="on"
            >
              Transfer ownership
              <v-icon right small>fas fa-pencil-alt</v-icon>
            </v-btn>
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

        <v-btn color="accent" @click="viewOwnershipHistory()" v-if="$userHasRole('admin')">
          Ownership History
          <v-icon right small>fas fa-eye</v-icon>
        </v-btn>

        <v-btn
          color="accent"
          @click="getBillsByVehicleId()"
          v-if="$userHasRole('admin')"
          :disabled="bills !== null"
        >
          Bills
          <v-icon right small>fas fa-eye</v-icon>
        </v-btn>
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
      activeOwnerCredential: null,
      activeCarTracker: null,
      ownerCredentials: null,
      carTrackers: null,
      bills: null,
      ownershipHistory: null
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
          this.vehicle.ownerCredentials = ownerCredential;
          this.getOwnerCredentialsUnused();
          this.$store.dispatch("successMessage", "Ownership transferred");
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("errorMessage", "Error transferring ownership");
        });
    },
    getOwnerCredentialsUnused() {
      this.$store
        .dispatch("getOwnerCredentials")
        .then(ownerCredentials => {
          this.ownerCredentials = ownerCredentials.filter(
            x => x.id !== this.vehicle.ownerCredentials.id
          );
        })
        .catch(err => {
          this.$store.dispatch(
            "errorMessage",
            "Error getting ownercredentials"
          );
        });
    },
    getCarTrackersUnused() {
      this.$store
        .dispatch("getCarTrackersUnused")
        .then(carTrackers => (this.carTrackers = carTrackers))
        .catch(err => {
          this.$store.dispatch("errorMessage", "Error getting car trackers");
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
    },
    changeCarTracker(ct) {
      if (!ct) return;

      let payload = {
        vehicleId: this.vehicle.id,
        ctId: ct.id
      };

      this.$store
        .dispatch("changeCarTracker", payload)
        .then(() => {
          this.vehicle.carTrackers.push(ct);
          this.getCarTrackersUnused();
          this.$store.dispatch("successMessage", "Car tracker changed");
        })
        .catch(err => {
          this.$store.dispatch("errorMessage", "Error changing car tracker");
        });
    },
    viewOwnershipHistory() {
      this.$store
        .dispatch("getOwnershipHistory", this.vehicle.licencePlate)
        .then(res => {
          this.ownershipHistory = res;
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch(
            "errorMessage",
            "Error getting ownership history"
          );
        });
    }
  },
  watch: {
    vehicle(val) {
      if (val) {
        this.bills = null;
        this.getOwnerCredentialsUnused();
        this.getCarTrackersUnused();
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
