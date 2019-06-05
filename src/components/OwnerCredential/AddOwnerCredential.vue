<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-show="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New owner credentials</h3>
        <v-text-field
          v-validate="'required'"
          v-model="ownerCredentials.name"
          clearable
          label="Name"
          name="name"
          required
        ></v-text-field>
        <span class="red--text">{{ errors.first('name') }}</span>
        <v-text-field
          v-validate="'required'"
          v-model="ownerCredentials.city"
          clearable
          label="City"
          required
          name="city"
        ></v-text-field>
        <span class="red--text">{{ errors.first('city') }}</span>
        <v-text-field
          v-validate="'required|max:9|min:9'"
          v-model="ownerCredentials.bsn"
          number
          min="9"
          max="9"
          type="number"
          placeholder="000000000"
          clearable
          label="BSN"
          required
          name="bsn"
        ></v-text-field>
        <span class="red--text">{{ errors.first('bsn') }}</span>
        <v-text-field
          v-validate="'required|min:6|max:6'"
          v-model="ownerCredentials.postalCode"
          clearable
          label="Postal code"
          required
          name="postalcode"
        ></v-text-field>
        <span class="red--text">{{ errors.first('postalcode') }}</span>
        <v-text-field
          v-validate="'required'"
          v-model="ownerCredentials.streetName"
          clearable
          label="Street name"
          name="street"
          required
        ></v-text-field>
        <span class="red--text">{{ errors.first('street') }}</span>
        <v-text-field
          v-validate="'required'"
          v-model="ownerCredentials.houseNumber"
          clearable
          type="number"
          label="House number"
          required
          name="housenumber"
        ></v-text-field>
        <span class="red--text">{{ errors.first('housenumber') }}</span>

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
        bsn: null,
        city: null,
        postalCode: null,
        name: null,
        streetName: null,
        houseNumber: null
      },
      adding: false,
      valid: false
    };
  },
  methods: {
    resetForm() {
      this.ownerCredentials = {
        name: null,
        city: null,
        bsn: null,
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
