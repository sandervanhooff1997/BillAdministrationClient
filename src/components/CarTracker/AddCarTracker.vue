<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-if="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New car tracker</h3>
        <v-text-field
          :rules="hardwareRules"
          v-model="carTracker.hardware"
          clearable
          label="Hardware"
          required
        ></v-text-field>
        <v-btn color="primary" :disabled="!valid" @click="save(carTracker)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carTracker: {
        hardware: ""
      },
      adding: false,
      valid: false,
      hardwareRules: [v => !!v || "Hardware is required"]
    };
  },
  methods: {
    resetForm() {
      this.carTracker.hardware = "";
      this.adding = false;
    },
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(carTracker) {
      this.$store
        .dispatch("addCarTracker", carTracker)
        .then(() => {
          this.resetForm();
          this.$store.dispatch("getCarTrackers");
        })
        .catch(err =>
          this.$store.dispatch("errorMessage", "Error getting car trackers")
        );
    }
  }
};
</script>

<style>
</style>
