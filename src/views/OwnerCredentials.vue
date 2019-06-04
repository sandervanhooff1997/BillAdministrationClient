<template>
  <v-container>
    <add-owner-credential></add-owner-credential>
    <div v-if="ownerCredentials">
      <v-card flat>
        <v-data-table :headers="headers" :items="ownerCredentials" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="selectOwnerCredentials(props.item)">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.bsn }}</td>
              <td>{{ props.item.isAccountRider }}</td>
            </tr>
          </template>
        </v-data-table>
        <owner-credential class="mt-4"></owner-credential>
      </v-card>
    </div>
    <div v-else>
      <p>No Car Trackers found</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID #", value: "id" },
        { text: "Name", value: "name" },
        { text: "BSN", value: "bsn" },
        { text: "Account Rider", value: "isAccountRider" }
      ],
      selectedOwnerCredentials: null
    };
  },
  computed: {
    ownerCredentials() {
      return this.$store.getters.ownerCredentials;
    }
  },
  methods: {
    selectOwnerCredentials(ownerCredentials) {
      this.$store.commit("setOwnerCredential", ownerCredentials);
    }
  },
  created() {
    this.$store.dispatch("getOwnerCredentials");
  }
};
</script>

<style>
</style>
