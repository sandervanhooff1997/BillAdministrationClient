<template>
  <v-container>
    <add-road></add-road>
    <v-container>
      <v-layout>
        <v-flex xs12 sm6>
          <default-price></default-price>
        </v-flex>
        <v-flex xs12 sm6>
          <default-price :rush-price="true"></default-price>
        </v-flex>
      </v-layout>
    </v-container>
    <div v-if="roads">
      <v-card flat>
        <v-data-table :headers="headers" :items="roads" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectRoad(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
            </tr>
          </template>
        </v-data-table>
        <road class="mt-4"></road>
      </v-card>
    </div>
    <div v-else>
      <p>No Roads found</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Address", value: "name" }
      ],
      selectedRoad: null
    };
  },
  computed: {
    roads() {
      return this.$store.getters.roads;
    }
  },
  methods: {
    selectRoad(road) {
      this.$store.commit("setRoad", road);
    }
  },
  created() {
    this.$store.dispatch("getRoads");
  }
};
</script>

<style>
</style>
