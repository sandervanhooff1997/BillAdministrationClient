\<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-if="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New owner credentials</h3>
        <v-text-field
          :rules="requiredRules"
          v-model="ownerCredentials.name"
          clearable
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          :rules="requiredRules"
          v-model="ownerCredentials.city"
          clearable
          label="City"
          required
        ></v-text-field>
        <v-text-field
          :rules="requiredRules"
          v-model="ownerCredentials.postalCode"
          clearable
          label="Postal code"
          required
        ></v-text-field>
        <v-text-field
          :rules="requiredRules"
          v-model="ownerCredentials.streetName"
          clearable
          label="Street name"
          required
        ></v-text-field>
        <v-text-field
          :rules="houseNumberRules"
          v-model="ownerCredentials.houseNumber"
          clearable
          label="House number"
          required
        ></v-text-field>

        <v-btn color="primary" :disabled="!valid" @click="save(ownerCredentials)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ownerCredentials: {
        name: null,
        city: null,
        postalCode: null,
        name: null,
        streetName: null,
        houseNumber: null
      },
      adding: false,
      valid: false,
      requiredRules: [v => !!v || "Hardware is required"],
      houseNumberRules: [
        v => !isNaN(v) || "Housenumber must be a number",
        v => !!v || "Housenumber is required"
      ]
    };
  },
  methods: {
    resetForm() {
      this.ownerCredentials = {
        name: null,
        city: null,
        postalCode: null,
        name: null,
        streetName: null,
        houseNumber: null
      };
      this.adding = false;
    },
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(ownerCredentials) {
      this.$store
        .dispatch("addOwnerCredentials", ownerCredentials)
        .then(() => {
          this.resetForm();
          this.$store.dispatch("successMessage", "Ownercredentials created");
          this.$store.dispatch("getOwnerCredentials");
        })
        .catch(err => {
          this.$store.dispatch(
            "errorMessage",
            "Error adding owner credentials"
          );
        });
    }
  }
};
</script>

<style>
</style>
