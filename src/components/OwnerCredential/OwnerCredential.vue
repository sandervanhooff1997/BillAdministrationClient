<template>
  <div>
    <v-card v-if="ownerCredential" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-user</v-icon>
        <span class="title font-weight-light">Owner Credentials #{{ownerCredential.id}}</span>
        <v-spacer></v-spacer>
        <v-btn v-if="!oc" icon @click="hide()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Name</v-flex>
          <v-flex xs6>{{ownerCredential.name}}</v-flex>

          <v-flex xs6>BSN</v-flex>
          <v-flex xs6>{{ownerCredential.bsn}}</v-flex>

          <v-flex xs6>Is account driver</v-flex>
          <v-flex xs6>{{ownerCredential.accountRider}}</v-flex>

          <v-flex xs6>Address</v-flex>
          <v-flex
            xs6
          >{{ownerCredential.streetName}} {{ownerCredential.houseNumber}}, {{ownerCredential.postalCode}} {{ownerCredential.city}}</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions></v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["oc"],
  methods: {
    edit(ownerCredentials) {
      ownerCredentials;
    },
    hide() {
      this.$store.commit("setOwnerCredential", null);
    }
  },
  computed: {
    ownerCredential() {
      if (this.oc) {
        // return last element from array if its an array
        if (Array.isArray(this.oc)) return this.oc[this.oc.length - 1];

        return this.oc;
      }

      return this.$store.getters.ownerCredential;
    }
  }
};
</script>

<style>
</style>
