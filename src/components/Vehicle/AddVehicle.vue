<template>
  <div class="mb-4">
    <v-btn color="accent" @click="add()" v-if="!adding">Add</v-btn>
    <div v-if="adding">
      <v-btn color="warning" class="mb-2" @click="cancel()">Cancel</v-btn>
      <v-form v-model="valid">
        <h3 class="title">New vehicle</h3>
        <v-text-field
          :rules="licencePlateRules"
          v-model="vehicle.licencePlate"
          clearable
          label="Licenceplate"
          required
        ></v-text-field>
        <v-select
          :items="rateCategories"
          v-model="vehicle.rateCategory"
          item-text="name"
          item-value="id"
          label="Select rate category"
        ></v-select>
        <v-select
          :items="carTrackers"
          v-model="vehicle.carTracker"
          item-text="hardware"
          item-value="id"
          label="Select car tracker"
        ></v-select>
        <v-btn color="primary" @click="save(vehicle)">Save</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
/**
 * @Id
    @GeneratedValue
    private Long id;

    private String licencePlate;

    @ManyToOne(cascade = CascadeType.ALL)
    private RateCategory rateCategory;

    @OneToMany(targetEntity = CarTracker.class, cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List carTrackers = new ArrayList();

    @OneToMany(targetEntity = OwnerCredentials.class, cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List ownerCredentials = new ArrayList();

 */
export default {
  data() {
    return {
      vehicle: {
        licencePlate: null,
        rateCategory: null,
        carTracker: null
      },
      adding: false,
      valid: false,
      licencePlateRules: [v => !!v || "Licenceplate is required"],
      rateCategoryRules: [v => !!v || "Rate category is required"],
      carTrackerRules: [v => !!v || "Car tracker is required"]
    };
  },
  computed: {
    rateCategories() {
      return this.$store.getters.rateCategories;
    },
    carTrackers() {
      return this.$store.getters.carTrackers;
    }
  },
  methods: {
    add() {
      this.adding = true;
    },
    cancel() {
      this.adding = false;
    },
    save(vehicle) {
      this.$store.dispatch("addVehicle", vehicle).then(() => {
        this.vehicle = null;
        this.$store.dispatch("getVehicles");
      });
    }
  },
  created() {
    this.$store.dispatch("getRateCategories");
    this.$store.dispatch("getCarTrackers");
  }
};
</script>

<style>
</style>
