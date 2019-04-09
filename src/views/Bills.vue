<template>
  <v-container>
    <v-card flat>
      <div v-if="bills">
        <v-data-table :headers="headers" :items="bills" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectBill(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.totalAmount }}</td>
              <td>{{ props.item.date | date }}</td>
              <td>{{ props.item.paymentStatus }}</td>
            </tr>
          </template>
        </v-data-table>
        <div class="mt-4" v-if="selectedBill">
          <bill :bill="selectedBill"></bill>
        </div>
      </div>
      <div v-else>
        <p>No bills found</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Total Amount", value: "totalAmount" },
        { text: "Date", value: "date" },
        { text: "Payment Status", value: "paymentStatus" }
      ],

      selectedBill: null
    };
  },
  computed: {
    bills() {
      return this.$store.getters.bills;
    }
  },
  methods: {
    selectBill(bill) {
      this.selectedBill = bill;
    }
  },
  created() {
    this.$store.dispatch("getBills");
  }
};
</script>

<style>
</style>
