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
        { text: "Price / KM", value: "price" }
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
  }
};
</script>

<style>
</style>
