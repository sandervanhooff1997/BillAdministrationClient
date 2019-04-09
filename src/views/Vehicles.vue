<template>
  <v-container>
    <div v-if="vehicles">
      <v-card flat>
        <v-data-table :headers="headers" :items="vehicles" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectVehicle(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.licencePlate }}</td>
              <td>{{ props.item.ownerCredentials[props.item.ownerCredentials.length-1].name }}</td>
            </tr>
          </template>
        </v-data-table>
        <div class="mt-4" v-if="selectedVehicle">
          <vehicle :vehicle="selectedVehicle"></vehicle>
        </div>
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
        { text: "Owner", value: "ownerCredentials.name" }
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
      this.selectedVehicle = vehicle;
    }
  },
  created() {
    this.$store.dispatch("getVehicles");
  }
};
</script>

<style>
</style>
