<template>
  <v-app id="BillAdministration">
    <loader v-if="loading"/>
    <v-navigation-drawer permanent fixed app>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item.iconAlt"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(child, i) in item.children" :key="i" :to="{name: child.to}">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="{name: item.to}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.text }}</v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    title: "Bill Administration",
    items: [
      { text: "Bills", icon: "fas fa-file-invoice", to: "bills" },
      { text: "Car Trackers", icon: "fas fa-cogs", to: "cartrackers" },
      { text: "Vehicles", icon: "fas fa-car", to: "vehicles" }
    ]
  }),
  props: {
    source: String
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {}
};
</script>

<style lang="scss">
#BillAdministration {
  background: white;
}
</style>
