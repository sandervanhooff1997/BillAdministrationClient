<template>
  <v-container>
    <v-card flat>
      <v-data-table :headers="headers" :items="rateCategories" class="elevation-1">
        <template v-slot:items="props">
          <tr @click="selectRateCategory(props.item)">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.price }}</td>
          </tr>
        </template>
      </v-data-table>
      <div class="mt-4" v-if="selectedRateCategory">
        <rate-category :rate-category="selectedRateCategory"></rate-category>
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
        { text: "Name", value: "name" },
        { text: "Price", value: "price" }
      ],
      rateCategories: [
        {
          id: 1,
          name: "Category 1",
          price: 10.0
        },
        {
          id: 2,
          name: "Category 2",
          price: 20.0
        },
        {
          id: 3,
          name: "Category 3",
          price: 30.0
        },
        {
          id: 4,
          name: "Category 4",
          price: 40.0
        },
        {
          id: 5,
          name: "Category 5",
          price: 50.0
        }
      ],
      selectedRateCategory: null
    };
  },
  methods: {
    selectRateCategory(rateCategory) {
      this.selectedRateCategory = rateCategory;
    }
  }
};
</script>

<style>
</style>
