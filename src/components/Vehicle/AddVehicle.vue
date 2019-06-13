<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-if="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New vehicle</h3>
        <v-text-field
          v-validate="'required|min:6|max:6'"
          v-model="vehicle.licencePlate"
          clearable
          label="Licenceplate"
          name="licensePlate"
          required
        ></v-text-field>
        <span class="red--text">{{ errors.first('licensePlate') }}</span>
        <v-select
          :items="vehicleTypes"
          v-model="vehicle.vehicleType"
          item-text="vehicleType"
          item-value="vehicleType"
          label="Select vehicle type"
        ></v-select>
        <v-select
          :items="carTrackers"
          v-model="vehicle.carTracker"
          item-text="hardware"
          item-value="id"
          label="Select car tracker"
        ></v-select>
        <v-select
          :items="ownerCredentials"
          v-model="vehicle.ownerCredentials"
          item-text="name"
          item-value="id"
          label="Select the owner"
        ></v-select>
        <v-btn color="primary" :disabled="!valid" @click="save(vehicle)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vehicle: {
        licencePlate: null,
        vehicleType: null,
        ownerCredentials: null,
        carTracker: null
      },
      vehicleTypes: ["ELECTRIC", "COMBUSTION"],
      adding: false,
      valid: false,
      carTrackerRules: [v => !!v || "Car tracker is required"]
    };
    carTrackers: [];
    ownerCredentials: [];
  },
  methods: {
    async add() {
      try {
        let carTrackers = await this.$store.dispatch("getCarTrackersUnused");
        this.carTrackers = carTrackers;

        let ownerCredentials = await this.$store.dispatch(
          "getOwnerCredentials"
        );
        this.ownerCredentials = ownerCredentials;

        this.adding = true;
      } catch (e) {
        console.log(e);
        this.$store.dispatch("errorMessage", "Error getting data");
      }
    },
    cancel() {
      this.adding = false;
    },
    resetForm() {
      this.vehicle = {
        licencePlate: null,
        vehicleType: null,
        ownerCredentials: null,
        carTracker: null
      };
      this.adding = false;
    },
    save(vehicle) {
      this.$store.dispatch("addVehicle", vehicle).then(() => {
        this.resetForm();
        this.$store.dispatch("successMessage", "Vehicle created");
        this.$store.dispatch("getVehicles");
      });
    }
  }
};
</script>

<style>
</style>
