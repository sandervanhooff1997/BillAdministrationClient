<template>
  <div v-if="price">
    <p class="black--text mb-0">{{label}}</p>
    <p class="priceLabel headline" @click="changing = true;" v-if="!changing">&euro; {{price.price}}</p>
    <v-form v-else>
      <v-text-field
        v-validate="'required|min:0|decimal:2'"
        type="number"
        class="mb-1"
        light
        v-model="price.price"
        clearable
        label="Amount"
        name="amount"
        required
      ></v-text-field>
      <span class="red--text">{{ errors.first('amount') }}</span>
      <v-btn flat @click="cancel()">Cancel</v-btn>
      <v-btn color="primary" :disabled="errors.items.length > 0" @click="save(price.price)">Save</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["rushPrice"],
  data() {
    return {
      changing: false,
      price: null,
      originalPrice: null,
      priceRules: [v => !!v || "Amount is required"]
    };
  },
  computed: {
    label() {
      return this.rushPrice ? "Default rush price" : "Default price";
    }
  },
  methods: {
    async save(editablePrice) {
      try {
        this.price = await this.$store.dispatch("createOrUpdateDefaultPrice", {
          price: editablePrice,
          rushPrice: this.rushPrice
        });
        this.originalPrice = JSON.parse(JSON.stringify(this.price));
        this.changing = false;
      } catch (e) {
        console.log(e);
        this.$store.dispatch("errorMessage", "Error updating default price");
      }
    },
    cancel() {
      this.price = this.originalPrice;
      this.changing = false;
    }
  },
  async mounted() {
    if (this.rushPrice) {
      this.price = await this.$store.dispatch("getDefaultRushPrice");
    } else {
      this.price = await this.$store.dispatch("getDefaultPrice");
    }

    this.originalPrice = JSON.parse(JSON.stringify(this.price));
  }
};
</script>

<style scoped>
.priceLabel {
  cursor: pointer;
}
</style>
