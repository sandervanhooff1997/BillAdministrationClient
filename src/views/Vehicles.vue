<template>
  <v-container>
    <add-vehicle></add-vehicle>
    <div v-if="vehicles">
      <v-card flat>
        <v-data-table :headers="headers" :items="vehicles" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectVehicle(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.licencePlate }}</td>
              <td>{{ props.item.vehicleType }}</td>
              <td>{{ props.item.ownerCredentials.name }}</td>
              <td
                v-if="props.item.carTrackers && props.item.carTrackers.length"
              >{{ props.item.carTrackers[props.item.carTrackers.length-1].hardware }}</td>
              <td v-else>No car tracker</td>
            </tr>
          </template>
        </v-data-table>
        <vehicle class="mt-4"></vehicle>
      </v-card>
    </div>
    <div v-else>
      <p>No vehicles found</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Licence plate", value: "licencePlate" },
        { text: "Emission type", value: "vehicleType" },
        { text: "Owner", value: "ownerCredentials.name" },
        { text: "Car tracker", value: "carTracker.hardware" }
      ],

      selectedVehicle: null
    };
  },
  computed: {
    vehicles() {
      return this.$store.getters.vehicles;
    }
  },
  methods: {
    selectVehicle(vehicle) {
      this.$store.commit("setVehicle", vehicle);
    }
  },
  created() {
    this.$store.dispatch("getVehicles");
  }
};
</script>

<style>
</style>
