<template>
  <div v-if="authorisationCode && serialNumber">
    <h1 class="headline">View movements</h1>
    <v-text-field v-model="authorisationCode" label="Authorisation Code" :readonly="true"></v-text-field>
    <v-text-field v-model="serialNumber" label="Serial Number" :readonly="true"></v-text-field>
    <v-data-table :headers="headers" :items="movements" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.date | formatDate }}</td>
        <td>
          {{ props.item.coord.lat }}
          <br>
          {{ props.item.coord.lng }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["authorisationCode", "serialNumber", "movements"],
  data() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Coord", value: "coord" }
      ]
    };
  }
};
</script>

<style>
</style>
