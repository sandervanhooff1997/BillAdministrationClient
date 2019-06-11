<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">
      <span v-if="rushHour">Update price (rush hour)</span>
      <span v-else>Update price</span>
    </v-btn>
    <div v-show="adding" class="white pa-3" light>
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title black--text">New price</h3>
        <v-text-field
          type="number"
          class="mb-1"
          light
          :rules="priceRules"
          v-model="price"
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
      price: null,
      adding: false,
      valid: false,
      priceRules: [v => !!v || "Amount is required"]
    };
  },
  methods: {
    resetForm() {
      this.price = null;
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
          .then(newPrice => {
            this.$store.dispatch("getPrices");
            this.resetForm();
            let road = this.$store.getters.road;
            if (road) {
              road.rushPrice = newPrice;
              this.$store.commit("setRoad", Object.assign(road));
            }
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("errorMessage", "Error getting prices");
          });
      } else {
        this.$store
          .dispatch("addPriceToRoad", price)
          .then(newPrice => {
            this.$store.dispatch("getPrices");
            this.resetForm();
            let road = this.$store.getters.road;
            if (road) {
              road.price = newPrice;
              this.$store.commit("setRoad", Object.assign(road));
            }
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("errorMessage", "Error getting prices");
          });
      }
    }
  }
};
</script>

<style>
</style>
