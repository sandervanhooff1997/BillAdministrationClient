<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-show="adding" class="white pa-3" light>
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New price</h3>
        <v-text-field
          type="number"
          class="mb-1"
          light
          :rules="priceRules"
          v-model="price.price"
          clearable
          label="Amount"
          required
        ></v-text-field>
        <v-btn color="primary" :disabled="!valid" @click="save(price)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rushHour"],
  data() {
    return {
      price: {
        price: ""
      },
      adding: false,
      valid: false,
      priceRules: [v => !!v || "Amount is required"]
    };
  },
  methods: {
    resetForm() {
      this.price.price = null;
      this.adding = false;
    },
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(price) {
      if (this.rushHour) {
        this.$store
          .dispatch("addRushHourPriceToRoad", price)
          .then(() => {
            this.resetForm();
            this.$store.dispatch("getPrices");
          })
          .catch(err =>
            this.$store.dispatch("errorMessage", "Error getting prices")
          );
      } else {
        this.$store
          .dispatch("addPriceToRoad", price)
          .then(() => {
            this.resetForm();
            this.$store.dispatch("getPrices");
          })
          .catch(err =>
            this.$store.dispatch("errorMessage", "Error getting prices")
          );
      }
    }
  }
};
</script>

<style>
</style>
