<template>
  <v-container style="height: 100%;">
    <v-layout jalign-center justify-center row fill-height>
      <v-flex xs8 sm6>
        <v-card>
          <v-card-title class="primary white--text py-4 title">Bill Administration</v-card-title>
          <v-form v-model="valid" lazy-validation>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="fas fa-envelope"
                    label="E-mail"
                    placeholder="test@example.com"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="fas fa-unlock"
                    required
                    label="Password"
                    type="password"
                    placeholder="******"
                    v-model="password"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" class="elevation-0" :disabled="!valid" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      email: "s.vanhooff@hotmail.com",
      password: "123",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        isNumber: v => !isNaN(v) || "Must be a number"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$store.dispatch("successMessage", "Welcome back");
          })
          .catch(err => {
            console.log("Login error", err);
            this.$store.dispatch("errorMessage", "Unauthenticated");
          });
      }
    }
  }
};
</script>

<style>
</style>