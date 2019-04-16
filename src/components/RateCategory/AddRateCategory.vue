<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-if="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New rate category</h3>
        <v-text-field
          :rules="nameRules"
          v-model="rateCategory.name"
          clearable
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          :rules="priceRules"
          v-model="rateCategory.price"
          clearable
          label="Price"
          prefix="€"
          required
        ></v-text-field>
        <v-btn color="primary" @click="save(rateCategory)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rateCategory: {
        name: null,
        price: null
      },
      adding: false,
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      priceRules: [
        v => !!v || "Price is required",
        v => !isNaN(v) || "Price must be a number"
      ]
    };
  },
  methods: {
    resetForm() {
      this.rateCategory.name = null;
      this.rateCategory.price = null;
      this.adding = false;
    },
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(rateCategory) {
      console.log(rateCategory);
      this.$store
        .dispatch("addRateCategory", rateCategory)
        .then(() => {
          this.resetForm();
          this.$store.dispatch("getRateCategories");
          this.$store.dispatch("successMessage", "Rate category added");
        })
        .catch(err =>
          this.$store.dispatch("errorMessage", "Error adding Rate category")
        );
    }
  }
};
</script>

<style>
</style>
