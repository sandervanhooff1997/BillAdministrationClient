<template>
  <v-container>
    <add-rate-category></add-rate-category>
    <div v-if="rateCategories">
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
    </div>
    <div v-else>
      <p>No rate categories found</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Name", value: "name" },
        { text: "Price / KM", value: "price" }
      ],
      selectedRateCategory: null
    };
  },
  computed: {
    rateCategories() {
      return this.$store.getters.rateCategories;
    }
  },
  methods: {
    selectRateCategory(rateCategory) {
      this.selectedRateCategory = rateCategory;
    }
  },
  created() {
    this.$store.dispatch("getRateCategories");
  }
};
</script>

<style>
</style>
