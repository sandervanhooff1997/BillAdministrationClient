<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Search movements</v-toolbar-title>
      <v-spacer></v-spacer>
      <transition name="bounce">
        <v-btn icon v-if="validForm" color="primary">
          <v-icon>search</v-icon>
        </v-btn>
      </transition>
    </v-toolbar>
    <v-text-field
      v-model="authorisationCodes"
      label="Authorisation Code"
      required
      value
      hint="* comma seperate multiple codes"
    ></v-text-field>
    <v-toolbar class="mt-4" color="primary" dark>
      <label class="title">Pick date(s)</label>
    </v-toolbar>
    <v-date-picker v-model="dates" full-width no-title multiple></v-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      authorisationCodes: null
    };
  },
  computed: {
    seperatedAuthorisationCodes() {
      if (this.authorisationCodes) return this.authorisationCodes.split(",");
    },
    validForm() {
      return (
        this.authorisationCodes !== null &&
        this.authorisationCodes !== "" &&
        this.dates !== null &&
        this.dates.length
      );
    }
  }
};
</script>

<style>
</style>
