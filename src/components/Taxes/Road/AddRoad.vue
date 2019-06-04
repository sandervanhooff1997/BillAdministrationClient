<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-if="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New road</h3>
        <v-text-field :rules="nameRules" v-model="road.name" clearable label="Address" required></v-text-field>

        <v-text-field
          :rules="priceRules"
          v-model="road.price"
          clearable
          label="Price / KM"
          prefix="€"
          type="number"
          required
        ></v-text-field>

        <v-text-field
          :rules="priceRules"
          v-model="road.rushHourPrice"
          clearable
          type="number"
          label="Price / KM (Rush hour)"
          prefix="€"
          required
        ></v-text-field>

        <!-- <v-select
          :items="defaultPricesUnused"
          v-model="road.priceId"
          item-text="price"
          item-value="id"
          prepend-icon="fas fa-euro-sign"
          label="Select the price / KM"
          clearable
          :rules="priceRules"
        ></v-select>

        <v-select
          :items="rushHourPricesUnused"
          v-model="road.rushHourPriceId"
          item-text="price"
          item-value="id"
          prepend-icon="fas fa-euro-sign"
          label="Select the rush hour price / KM"
          :rules="rushHourPriceRules"
          clearable
        ></v-select>-->

        <v-btn color="primary" :disabled="!valid" @click="save(road)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pricesUnused: null,
      road: {
        name: "",
        price: null,
        rushHourPrice: null
      },
      adding: false,
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      priceRules: [v => !!v || "Price is required"],
      rushHourPriceRules: [v => !!v || "Rush Hour price is required"]
    };
  },
  methods: {
    resetForm() {
      this.road.name = "";
      this.road.price = null;
      this.road.rushHourPrice = null;
      this.adding = false;
    },
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(road) {
      this.$store
        .dispatch("addRoad", road)
        .then(() => {
          this.resetForm();
          this.$store.dispatch("getRoads");
        })
        .catch(err => this.$store.dispatch("errorMessage", err));
    }
  }
  // computed: {
  //   defaultPricesUnused() {
  //     if (!this.pricesUnused) return null;

  //     return this.pricesUnused.filter(x => x.id !== this.road.rushHourPriceId);
  //   },
  //   rushHourPricesUnused() {
  //     if (!this.pricesUnused) return null;

  //     return this.pricesUnused.filter(x => x.id !== this.road.priceId);
  //   }
  // },
  // watch: {
  //   adding(val) {
  //     if (val) {
  //       this.$store
  //         .dispatch("getPricesUnused")
  //         .then(prices => (this.pricesUnused = prices))
  //         .catch(err => this.$store.dispatch("errorMessage", err));
  //     }
  //   }
  // }
};
</script>

<style>
</style>
