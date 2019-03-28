<template>
  <v-container>
    <v-card flat>
      <v-data-table :headers="headers" :items="carTrackers" class="elevation-1">
        <template v-slot:items="props">
          <tr @click="selectCarTracker(props.item)">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.kilometers }}</td>
            <td>{{ props.item.hardware }}</td>
            <td>{{ props.item.isDeleted }}</td>
          </tr>
        </template>
      </v-data-table>
      <vehicle></vehicle>
      <div class="mt-4" v-if="selectedCarTracker">
        <car-tracker :car-tracker="selectedCarTracker"></car-tracker>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Kilometers", value: "kilometers" },
        { text: "Hardware", value: "hardware" },
        { text: "Deleted", value: "isDeleted" }
      ],
      carTrackers: [
        {
          id: 1,
          kilometers: 12341,
          hardware: "Intel i7",
          isDeleted: true
        },
        {
          id: 5,
          kilometers: 321,
          hardware: "Intel i3",
          isDeleted: false
        },
        {
          id: 113,
          kilometers: 52352,
          hardware: "Intel i7",
          isDeleted: false
        },
        {
          id: 12,
          kilometers: 1232135,
          hardware: "Intel i3",
          isDeleted: false
        },
        {
          id: 51,
          kilometers: 756745,
          hardware: "Intel i5",
          isDeleted: true
        },
        {
          id: 90,
          kilometers: 543242,
          hardware: "Intel i7",
          isDeleted: false
        }
      ],
      selectedCarTracker: null
    };
  },
  methods: {
    selectCarTracker(carTracker) {
      this.selectedCarTracker = carTracker;
    }
  }
};
</script>

<style>
</style>
