<template>
  <v-layout row fill-height>
    <v-flex xs12 sm5>
      <v-card tile flat height="100%">
        <v-toolbar color="primary" dark tabs>
          <v-toolbar-title>Movement Registration</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>-->
          <template v-slot:extension>
            <v-tabs v-model="currentItem" color="transparent" grow slider-color="white">
              <v-tab v-for="item in items" :key="item" :href="'#tab-' + item">{{ item }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="currentItem">
          <v-tab-item v-for="(item, index) in items" :key="item" :value="'tab-' + item">
            <v-card flat>
              <v-card-text>
                <template v-if="index === 0">
                  <search-movements></search-movements>
                </template>
                <template v-if="index === 1">
                  <v-container fluid>
                    <vehicle-data
                      :authorisation-code="authorisationCode"
                      :serial-number="serialNumber"
                      :movements="movements"
                    ></vehicle-data>
                  </v-container>
                </template>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
    <v-flex xs12 sm7>
      <v-card dark tile flat height="100%"></v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      currentItem: "tab-Search",
      items: ["Search", "View"],
      authorisationCode: "TASESC",
      serialNumber: "DEAQ1",
      movements: [
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        },
        {
          date: new Date(),
          coord: {
            lat: 0.1232134,
            lng: 1.2312313
          }
        }
      ]
    };
  }
};
</script>

<style>
.fullheight {
  height: 100%;
}
</style>
