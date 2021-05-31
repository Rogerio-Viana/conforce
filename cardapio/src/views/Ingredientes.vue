<template>
  <div class="ingredientes">
    <v-container>
      <v-container class="">
        <v-row justify="start">
          <v-col cols="3">
            <v-btn class="ma-2" outlined color="grey" @click="navigate('/')">
              <v-icon left> mdi-arrow-left </v-icon>Voltar
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col align-self="center" cols="12" md="4" sm="4" xs="12">
            <div class="headline">Ingredientes</div>
          </v-col>
          <v-col class="text-right" cols="8" md="8" sm="8" xs="12">
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="openCloseDialog"
              id="btnNovoIngrediente"
            >
              <v-icon left> mdi-plus </v-icon>Novo Ingrediente
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="12" sm="12" xs="12">
            <v-card class="pa-2" outlined tile>
              <v-data-table
                :headers="headers"
                :items="ingredientes"
                :search="search"
                id="tableIngredientes"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>
                      <v-btn
                        class="ma-2"
                        :loading="btnAtualizarTabela"
                        color="primary"
                        outlined
                        title="Atualizar"
                        @click="loader = 'btnAtualizarTabela'"
                      >
                        <v-icon light color="primary">mdi-cached</v-icon>
                        <template v-slot:loader>
                          <span class="custom-loader">
                            <v-icon light color="primary">mdi-cached</v-icon>
                          </span>
                        </template>
                      </v-btn>
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Pesquisar"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    title="Editar"
                    small
                    class="mr-3 btnEditar"
                    @click="editIngre(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    title="Apagar"
                    small
                    class="mr-3 btnApagar"
                    @click="deleteIngre(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title v-show="!ingrediente.id" class="headline">
          <v-icon left> mdi-plus </v-icon>Novo Ingrediente
        </v-card-title>
        <v-card-title v-show="ingrediente.id" class="headline">
          <v-icon left> mdi-pencil </v-icon>Editar Ingrediente
        </v-card-title>

        <v-card-text>
          <v-form ref="formIngrediente" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <input type="hidden" v-model="ingrediente.id" />
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="ingrediente.name"
                    required
                    :rules="campoObrigatorio"
                    id="inputName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-currency-brl"
                    label="Valor"
                    v-model="ingrediente.value"
                    required
                    :rules="campoObrigatorio"
                    id="inputValue"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined text @click="openCloseDialog">
            Cancelar
          </v-btn>
          <v-btn
            color="success"
            outlined
            text
            @click="saveIngrediente"
            :disabled="!valid"
            id="btnSalvarIngrediente"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Ingredientes",
  data() {
    return {
      valid: true,
      campoObrigatorio: [(v) => !!v || "Campo obrigatório"],
      search: "",
      dialog: false,
      ingrediente: { id: null, name: "", value: "" },
      btnAtualizarTabela: false,
      loader: null,

      headers: [
        { text: "INGREDIENTE", value: "name" },
        { text: "VALOR", value: "value" },
        { text: "AÇÂO", value: "actions", sortable: false, align: "center" },
      ],
      ingredientes: [],
    };
  },
  methods: {
    navigate(link) {
      window.location.href = link;
    },
    editIngre(item) {
      this.openCloseDialog()
      this.ingrediente = item
    },
    deleteIngre(item) {
      this.ingredientes.splice(this.ingredientes.indexOf(item), 1)
      this.$localStorage.set("ingredientes", JSON.stringify(this.ingredientes))
    },
    openCloseDialog() {
      if(!this.dialog) this.ingrediente = {};
      this.dialog = !this.dialog;
    },
    saveIngrediente() {
      this.$refs.formIngrediente.validate();

      if (this.ingrediente.value && this.ingrediente.name) {
        if(this.ingrediente.id){
          this.deleteIngre(this.ingrediente)
        }

        this.ingredientes.push({
          id: Date.now(),
          name: this.ingrediente.name,
          value: this.ingrediente.value,
        });


        this.$localStorage.set("ingredientes", JSON.stringify(this.ingredientes));

        this.openCloseDialog();
      }
    },
    initialize() {
      let dados = JSON.parse(this.$localStorage.get("ingredientes"));
      if (dados) {
        this.ingredientes = dados;
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      this.initialize();
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  created() {
    this.initialize();
  },
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>