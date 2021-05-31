<template>
  <v-app>
    <!-- Header -->
    <header>
      <v-app-bar app color="primary" dark>

        <v-spacer></v-spacer>

        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">github</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>
    </header>

    <!-- Main -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <footer></footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
