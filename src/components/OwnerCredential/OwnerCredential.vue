<template>
  <div>
    <v-card
      v-if="ownerCredentials && lastOwnerCredentials"
      dark
      flat
      color="primary"
      class="mx-auto"
    >
      <v-card-title>
        <v-icon large left>fas fa-user</v-icon>
        <span class="title font-weight-light">Owner Credentials #{{lastOwnerCredentials.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="ownerCredentials = null">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Name</v-flex>
          <v-flex xs6>{{lastOwnerCredentials.name}}</v-flex>

          <v-flex xs6>Is account driver</v-flex>
          <v-flex xs6>{{lastOwnerCredentials.accountRider}}</v-flex>

          <v-flex xs6>Address</v-flex>
          <v-flex
            xs6
          >{{lastOwnerCredentials.streetName}} {{lastOwnerCredentials.houseNumber}}, {{lastOwnerCredentials.postalCode}} {{lastOwnerCredentials.city}}</v-flex>

          <v-flex xs6>Begin</v-flex>
          <v-flex xs6>{{lastOwnerCredentials.begin | date}}</v-flex>

          <v-flex xs6>End</v-flex>
          <v-flex xs6>{{lastOwnerCredentials.end | date}}</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent" @click="edit(lastOwnerCredentials)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["ownerCredentials", "multiple"],
  methods: {
    edit(ownerCredentials) {
      ownerCredentials;
    }
  },
  computed: {
    lastOwnerCredentials() {
      return this.ownerCredentials[this.ownerCredentials.length - 1];
    }
  }
};
</script>

<style>
</style>
