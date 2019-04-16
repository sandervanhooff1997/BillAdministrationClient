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
          <v-flex xs6>{{bill.date | date }}</v-flex>

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
        <v-btn color="accent" @click="changePaymentStatus(bill)">Change payment status</v-btn>
        <v-btn color="accent" @click="recalculate(bill)">Recalculate</v-btn>
        <v-btn color="accent" @click="edit(bill)">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["bill"]
};
</script>

<style>
</style>
