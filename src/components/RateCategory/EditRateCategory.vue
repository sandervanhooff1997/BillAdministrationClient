<template>
  <div class="mb-4">
    <v-btn color="accent" @click="update()" v-if="!updating">Edit</v-btn>
    <div v-if="updating">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">Update rate category</h3>
        <v-text-field
          :rules="nameRules"
          v-model="rateCategory.name"
          clearable
          label="Name"
          color="accent"
          required
        ></v-text-field>
        <v-text-field
          :rules="priceRules"
          v-model="rateCategory.price"
          clearable
          color="accent"
          label="Price"
          prefix="€"
          required
        ></v-text-field>
        <v-btn color="accent" :disabled="!valid" @click="save(rateCategory)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rc"],
  data() {
    return {
      updating: false,
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      priceRules: [
        v => !!v || "Price is required",
        v => !isNaN(v) || "Price must be a number"
      ]
    };
  },
  computed: {
    rateCategory() {
      if (this.rc) return JSON.parse(JSON.stringify(this.rc));

      return JSON.parse(JSON.stringify(this.$store.getters.rateCategory));
    }
  },
  methods: {
    resetForm() {
      this.rateCategory.name = null;
      this.rateCategory.price = null;
      this.updating = false;
    },
    update() {
      this.updating = true;
    },
    cancel() {
      this.updating = false;
    },
    save(rateCategory) {
      this.$store
        .dispatch("editRateCategory", rateCategory)
        .then(() => {
          this.$store.dispatch("successMessage", "Rate category updated");
          this.$EventBus.$emit(
            "rateCategoryUpdated",
            JSON.parse(JSON.stringify(rateCategory))
          );
          this.resetForm();
        })
        .catch(err =>
          this.$store.dispatch("errorMessage", "Error updating Rate category")
        );
    }
  }
};
</script>

<style>
</style>
