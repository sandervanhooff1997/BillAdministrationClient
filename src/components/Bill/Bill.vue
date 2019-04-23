<template>
  <div>
    <v-card v-if="bill" flat color="primary" dark class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-file-invoice</v-icon>
        <span class="title font-weight-light">Bill #{{bill.id}}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="bill = null">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Total Amount</v-flex>
          <v-flex xs6>&euro; {{bill.totalAmount}}</v-flex>

          <v-flex xs6>Date</v-flex>
          <v-flex xs6>{{bill.createDate | date }}</v-flex>

          <v-flex xs6>Payment Status</v-flex>
          <v-flex xs6>{{bill.paymentStatus }}</v-flex>

          <car-tracker class="mt-2 ml-4" v-if="bill.carTracker" :car-tracker="bill.carTracker"></car-tracker>
        </v-layout>
        <v-container v-if="bill.problems && bill.problems.length" text-xs-right>
          <v-list light>
            <v-list-tile avatar v-for="(problem, index) in bill.problems" :key="index + problem">
              <v-list-tile-avatar>
                <v-icon>fas fa-exclamation</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{problem}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-menu offset-y class="mr-2" v-if="bill.paymentStatus === 'OPEN'">
          <template v-slot:activator="{ on }">
            <v-btn color="accent" dark v-on="on">Change payment status</v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(status, index) in statusses"
              :key="index"
              @click="changePaymentStatus(bill, status)"
            >
              <v-list-tile-title>{{ status}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-btn color="accent" @click="edit(bill)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["bill"],
  data() {
    return {
      statusses: ["PAYED", "CANCELLED"]
    };
  },
  methods: {
    changePaymentStatus(bill, status) {
      if (!bill || !status) return;

      bill.paymentStatus = status;

      this.$store
        .dispatch("updatePaymentStatus", bill)
        .then(() => {
          this.$store.dispatch("successMessage", "Payment status updated");
        })
        .catch(err => {
          this.$store.dispatch("errorMessage", "Error updating payment status");
        });
    }
  }
};
</script>

<style>
</style>
