<template>
  <v-container>
    <div class="mb-4">
      <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
      <div v-if="adding">
        <v-btn color="warning" @click="cancel()">Cancel</v-btn>
        <v-form v-model="valid">
          <v-container>
            <v-layout>
              <v-flex xs12 sm6>
                <v-text-field
                  :rules="nameRules"
                  v-model="rateCategory.name"
                  clearable
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  :rules="priceRules"
                  v-model="rateCategory.price"
                  clearable
                  label="Price"
                  prefix="€"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn color="primary" @click="save(rateCategory)">Save</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </div>
    </div>

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

      selectedRateCategory: null,
      adding: false,
      rateCategory: {
        name: null,
        price: null
      },
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      priceRules: [
        v => !!v || "Price is required",
        v => !isNaN(v) || "Price must be a number"
      ]
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
    },
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(rateCategory) {
      console.log(rateCategory);
    }
  },
  created() {
    this.$store.dispatch("getRateCategories");
  }
};
</script>

<style>
</style>
