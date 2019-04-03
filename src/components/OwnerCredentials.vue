<template>
  <div>
    <v-card v-if="ownerCredentials" dark flat color="primary" class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-user</v-icon>
        <span class="title font-weight-light">Owner Credentials #{{ownerCredentials.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="ownerCredentials = null">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Name</v-flex>
          <v-flex xs6>{{ownerCredentials.name}}</v-flex>

          <v-flex xs6>Is account driver</v-flex>
          <v-flex xs6>{{ownerCredentials.isAccountDriver}}</v-flex>

          <v-flex xs6>Address</v-flex>
          <v-flex
            xs6
          >{{ownerCredentials.streetName}} {{ownerCredentials.houseNumber}}, {{ownerCredentials.postalCode}} {{ownerCredentials.city}}</v-flex>

          <v-flex xs6>Begin</v-flex>
          <v-flex xs6>{{ownerCredentials.begin | date}}</v-flex>

          <v-flex xs6>End</v-flex>
          <v-flex xs6>{{ownerCredentials.end | date}}</v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent" @click="edit(ownerCredentials)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["ownerCredentials"],
  metdhods: {
    ownerCredentials: {
      id: 1,
      name: "",
      isAccountDriver: true,
      city: "Helmond",
      postalCode: "1111XX",
      streetName: "Horstenstraat",
      houseNumber: 10,
      begin: new Date(),
      end: new Date()
    },
    edit(ownerCredentials) {
      console.log(ownerCredentials);
    }
  }
};
</script>

<style>
</style>
