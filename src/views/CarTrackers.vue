<template>
  <v-container>
    <add-car-tracker></add-car-tracker>
    <div v-if="carTrackers">
      <v-card flat>
        <v-data-table :headers="headers" :items="carTrackers" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectCarTracker(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.mileage }}</td>
              <td>{{ props.item.hardware }}</td>
              <td>{{ props.item.deleted }}</td>
            </tr>
          </template>
        </v-data-table>
        <car-tracker class="mt-4"></car-tracker>
      </v-card>
    </div>
    <div v-else>
      <p>No Car Trackers found</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Mileage", value: "mileage" },
        { text: "Hardware", value: "hardware" },
        { text: "Deleted", value: "deleted" }
      ],

      selectedCarTracker: null
    };
  },
  computed: {
    carTrackers() {
      return this.$store.getters.carTrackers;
    }
  },
  methods: {
    selectCarTracker(carTracker) {
      this.$store.commit("setCarTracker", carTracker);
    }
  },
  created() {
    this.$store.dispatch("getCarTrackers");
  }
};
</script>

<style>
</style>
