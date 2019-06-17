<template>
  <v-container>
    <v-card light flat>
      <v-container fluid grid-list-md>
        <h1 class="headline">Filter bills</h1>
        <v-layout align-center justify-center wrap row>
          <v-flex xs12 sm6 md3>
            <v-select
              :items="carTrackers"
              clearable
              v-model="filters.carTracker"
              item-text="hardware"
              item-value="id"
              label="Car tracker"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3 v-if="!bs">
            <v-select
              clearable
              :items="ownerCredentials"
              v-model="filters.ownerCredentials"
              item-text="name"
              item-value="id"
              label="Owner credentials"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-select
              clearable
              :items="paymentStatusses"
              v-model="filters.paymentStatus"
              label="Payment status"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-select clearable :items="months" v-model="filters.month" label="Select month"></v-select>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-md>
        <h1 class="headline">Generate bills</h1>
        <v-layout align-center justify-center wrap row>
          <v-flex xs12>
            <v-select clearable :items="months" v-model="selectedMonth" label="Select month"></v-select>
            <v-btn @click="generateBills" color="primary">Generate Bills</v-btn>
          </v-flex>
        </v-layout>
      </v-container>

      <div v-if="billsFiltered && Array.isArray(billsFiltered)">
        <v-data-table :headers="headers" :items="billsFiltered" light class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectBill(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.ownerCredentials.name }}</td>
              <td>&euro; {{ props.item.totalAmount }}</td>
              <td>{{ props.item.createDateFormatted | date }}</td>
              <td>{{ props.item.monthName }}</td>
              <td>{{ props.item.paymentStatus }}</td>
            </tr>
          </template>
        </v-data-table>
        <bill class="mt-4"></bill>
      </div>
      <div v-else>
        <p>No bills found</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: ["bs"],
  data() {
    return {
      billsFiltered: null,
      selectedMonth: null,
      headers: [
        { text: "ID #", value: "id" },
        { text: "Billed to", value: "ownerCredentials" },
        { text: "Total Amount", value: "totalAmount" },
        { text: "Create date", value: "createDate" },
        { text: "Month", value: "monthName" },
        { text: "Payment Status", value: "paymentStatus" }
      ],
      filters: {
        carTracker: null,
        ownerCredentials: null,
        paymentStatus: null,
        month: null
      }
    };
  },
  computed: {
    // async billsFiltered() {
    //   if (this.bs) return await this.filterBills(this.bs);

    //   return await this.filterBills(this.$store.getters.bills);
    // },
    months() {
      return this.$store.getters.months;
    },
    paymentStatusses() {
      return this.$store.getters.paymentStatusses;
    },
    carTrackers() {
      return this.$store.getters.carTrackers;
    },
    ownerCredentials() {
      return this.$store.getters.ownerCredentials;
    }
  },
  watch: {
    filters: {
      deep: true,
      handler: async function() {
        let bills = this.bs || this.$store.getters.bills;

        this.filterBills(bills);
      }
    }
  },
  methods: {
    selectBill(bill) {
      this.$store.commit("setBill", bill);
    },
    async filterBills(bills) {
      let self = this;

      this.$store.commit("setLoading", true);

      setTimeout(() => {
        this.$store.commit("setLoading", false);

        if (
          !this.filters.carTracker &&
          !this.filters.ownerCredentials &&
          !this.filters.paymentStatus &&
          !this.filters.month
        )
          bills = [];

        if (this.filters.carTracker)
          bills = bills.filter(
            x => x.carTracker.id === self.filters.carTracker
          );

        if (this.filters.ownerCredentials)
          bills = bills.filter(
            x => x.ownerCredentials.id === self.filters.ownerCredentials
          );

        if (this.filters.paymentStatus)
          bills = bills.filter(
            x => x.paymentStatus === self.filters.paymentStatus
          );

        if (this.filters.month)
          bills = bills.filter(x => x.monthName === self.filters.month);

        this.billsFiltered = bills;
      }, Math.floor(Math.random() * Math.floor(1000)));
    },
    async generateBills() {
      if (!this.selectedMonth) return;

      try {
        let monthIndex = this.months.indexOf(this.selectedMonth);
        await this.$store.dispatch("generateBills", monthIndex);
      } catch (e) {
        console.log(e);
        this.$store.dispatch("errorMessage", "Error generating bills");
      }
    }
  },
  created() {
    // get from store or props
    if (!this.bs) this.$store.dispatch("getBills");

    this.$store.dispatch("getCarTrackers");
    this.$store.dispatch("getOwnerCredentials");
  }
};
</script>

<style>
</style>
