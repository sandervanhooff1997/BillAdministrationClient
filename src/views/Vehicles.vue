<template>
  <v-container>
    <v-card flat>
      <v-data-table :headers="headers" :items="vehicles" class="elevation-1">
        <template v-slot:items="props">
          <tr @click="selectVehicle(props.item)">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.licencePlate }}</td>
          </tr>
        </template>
      </v-data-table>
      <div class="mt-4" v-if="selectedVehicle">
        <vehicle :vehicle="selectedVehicle"></vehicle>
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
        { text: "Licence plate", value: "licencePlate" }
      ],
      vehicles: [
        {
          id: 1,
          licencePlate: "MMXX00",
          rateCategory: {
            id: 1,
            name: "Category 1",
            price: 10.0
          },
          carTracker: {
            id: 1,
            kilometers: 12341,
            hardware: "Intel i7",
            isDeleted: true
          },
          ownerCredentials: {
            id: 1,
            name: "Test user",
            isAccountDriver: true,
            city: "Helmond",
            postalCode: "1111XX",
            streetName: "Horstenstraat",
            houseNumber: 10,
            begin: new Date(),
            end: new Date()
          }
        },
        {
          id: 1,
          licencePlate: "MMXX00",
          rateCategory: {
            id: 1,
            name: "Category 1",
            price: 10.0
          },
          carTracker: {
            id: 1,
            kilometers: 12341,
            hardware: "Intel i7",
            isDeleted: true
          },
          ownerCredentials: {
            id: 1,
            name: "Test user",
            isAccountDriver: true,
            city: "Helmond",
            postalCode: "1111XX",
            streetName: "Horstenstraat",
            houseNumber: 10,
            begin: new Date(),
            end: new Date()
          }
        },
        {
          id: 1,
          licencePlate: "MMXX00",
          rateCategory: {
            id: 1,
            name: "Category 1",
            price: 10.0
          },
          carTracker: {
            id: 1,
            kilometers: 12341,
            hardware: "Intel i7",
            isDeleted: true
          },
          ownerCredentials: {
            id: 1,
            name: "Test user",
            isAccountDriver: true,
            city: "Helmond",
            postalCode: "1111XX",
            streetName: "Horstenstraat",
            houseNumber: 10,
            begin: new Date(),
            end: new Date()
          }
        },
        {
          id: 1,
          licencePlate: "MMXX00",
          rateCategory: {
            id: 1,
            name: "Category 1",
            price: 10.0
          },
          carTracker: {
            id: 1,
            kilometers: 12341,
            hardware: "Intel i7",
            isDeleted: true
          },
          ownerCredentials: {
            id: 1,
            name: "Test user",
            isAccountDriver: true,
            city: "Helmond",
            postalCode: "1111XX",
            streetName: "Horstenstraat",
            houseNumber: 10,
            begin: new Date(),
            end: new Date()
          }
        }
      ],
      selectedVehicle: null
    };
  },
  methods: {
    selectVehicle(vehicle) {
      this.selectedVehicle = vehicle;
    }
  }
};
</script>

<style>
</style>
