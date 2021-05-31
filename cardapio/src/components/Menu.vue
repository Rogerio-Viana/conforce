<template>
  <div class="menu">
    <v-container class="opcao">
      <v-row justify="center">
        <v-col cols="12" md="4" sm="12" xs="12">
          <v-card v-on:click="navigate('/lanches')" class="pa-2" outlined tile>
            <v-img
              src="../assets/icons/png/045-burger.png"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title>Lanches</v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12">
          <v-card
            v-on:click="navigate('/ingredientes')"
            class="pa-2"
            outlined
            tile
          >
            <v-img
              src="../assets/icons/png/igredientes.png"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title>Ingredientes</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Menu",
  methods: {
    navigate(link) {
      window.location.href = link;
    },
  },
};
</script>

<style scoped>
.menu {
  height: 100%;
  margin-top: 15px;
}
.menu .opcao img {
  max-height: 200px;
}
</style>