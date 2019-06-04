<template>
  <v-container>
    <add-price></add-price>
    <div v-if="prices">
      <v-card flat>
        <v-data-table :headers="headers" :items="prices" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectPrice(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.price }}</td>
              <td>{{ props.item.beginFormatted | date }}</td>
              <td>{{ props.item.endFormatted | date }}</td>
            </tr>
          </template>
        </v-data-table>
        <price class="mt-4"></price>
      </v-card>
    </div>
    <div v-else>
      <p>No Prices found</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Amount", value: "price" },
        { text: "Begin", value: "beginFormatted" },
        { text: "End", value: "endFormatted" }
      ],
      selectedPrice: null
    };
  },
  computed: {
    prices() {
      return this.$store.getters.prices;
    }
  },
  methods: {
    selectPrice(price) {
      this.$store.commit("setPrice", price);
    }
  },
  created() {
    this.$store.dispatch("getPrices");
  }
};
</script>

<style>
</style>
