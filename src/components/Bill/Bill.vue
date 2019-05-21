<template>
  <div>
    <v-card v-if="bill" flat color="primary" dark class="mx-auto">
      <v-card-title>
        <v-icon large left>fas fa-file-invoice</v-icon>
        <span class="title font-weight-light">Bill #{{bill.id}}</span>
        <v-spacer></v-spacer>
        <v-btn v-if="!b" icon @click="hide()">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class>
        <v-layout row wrap>
          <v-flex xs6>Total Amount</v-flex>
          <v-flex xs6>&euro; {{bill.totalAmount}}</v-flex>

          <v-flex xs6>Date</v-flex>
          <v-flex xs6>{{bill.createDateFormatted | date }}</v-flex>

          <v-flex xs6>Payment Status</v-flex>
          <v-flex xs6>{{bill.paymentStatus }}</v-flex>

          <v-flex xs12 md6>
            <car-tracker class="mt-2 ml-4" v-if="bill.carTracker" :ct="bill.carTracker"></car-tracker>
          </v-flex>
          <v-flex xs12 md6>
            <owner-credential
              class="mt-2 ml-4"
              v-if="bill.ownerCredentials"
              :oc="bill.ownerCredentials"
            ></owner-credential>
          </v-flex>
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
        <v-btn color="accent" @click="recalculate(bill)">Recalculate</v-btn>
        <v-menu offset-y class="mr-2">
          <template v-slot:activator="{ on }">
            <v-btn
              color="accent"
              :disabled="bill.paymentStatus !== 'OPEN'"
              dark
              v-on="on"
            >Change payment status</v-btn>
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
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["b"],
  data() {
    return {
      statusses: ["PAYED", "CANCELLED"]
    };
  },
  computed: {
    bill() {
      if (this.b) return this.b;

      return this.$store.getters.bill;
    }
  },
  methods: {
    hide() {
      this.$store.commit("setBill", null);
    },
    recalculate(bill) {
      if (!bill) return;

      this.$store
        .dispatch("recalculateBill", bill.id)
        .then(() => {
          this.$store.dispatch("successMessage", "Bill recalculated");
        })
        .catch(err => {
          this.$store.dispatch("errorMessage", "Error recalculating bill");
        });
    },
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
