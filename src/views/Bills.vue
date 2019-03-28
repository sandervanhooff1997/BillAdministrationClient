<template>
  <v-container>
    <v-card flat>
      <v-data-table :headers="headers" :items="bills" class="elevation-1">
        <template v-slot:items="props">
          <tr @click="selectBill(props.item)">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.date | date }}</td>
            <td>{{ props.item.paymentStatus }}</td>
          </tr>
        </template>
      </v-data-table>
      <div class="mt-4" v-if="selectedBill">
        <bill :bill="selectedBill"></bill>
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
        { text: "Amount", value: "amount" },
        { text: "Date", value: "date" },
        { text: "Payment Status", value: "paymentStatus" }
      ],
      bills: [
        {
          id: 1,
          amount: 10.55,
          date: new Date(),
          carTracker: {
            id: 1,
            kilometers: 12341,
            hardware: "Intel i7",
            isDeleted: true
          },
          paymentStatus: "OPEN",
          problems: []
        },
        {
          id: 2,
          amount: 10.55,
          date: new Date(),
          carTracker: {
            id: 5,
            kilometers: 5345234,
            hardware: "Intel i5",
            isDeleted: false
          },
          paymentStatus: "OPEN",
          problems: []
        },
        {
          id: 3,
          amount: 10.55,
          date: new Date(),
          carTracker: {
            id: 2,
            kilometers: 543523,
            hardware: "Intel i7",
            isDeleted: false
          },
          paymentStatus: "PAYED",
          problems: []
        },
        {
          id: 4,
          amount: 10.55,
          date: new Date(),
          carTracker: {
            id: 11,
            kilometers: 1231245,
            hardware: "Intel i7",
            isDeleted: false
          },
          paymentStatus: "PAYED",
          problems: []
        },
        {
          id: 5,
          amount: 10.55,
          date: new Date(),
          carTracker: {
            id: 233,
            kilometers: 634534,
            hardware: "Intel i5",
            isDeleted: true
          },
          paymentStatus: "OPEN",
          problems: []
        },
        {
          id: 6,
          amount: 10.55,
          date: new Date(),
          carTracker: {
            id: 51,
            kilometers: 40210017,
            hardware: "Intel i3",
            isDeleted: false
          },
          paymentStatus: "OPEN",
          problems: []
        }
      ],
      selectedBill: null
    };
  },
  methods: {
    selectBill(bill) {
      this.selectedBill = bill;
    }
  }
};
</script>

<style>
</style>
