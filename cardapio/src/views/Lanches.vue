<template>
  <div class="lanches">
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
            <div class="headline">Lanches</div>
          </v-col>
          <v-col class="text-right" cols="8" md="8" sm="8" xs="12">
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="openCloseDialog"
              id="btnNovoLanche"
            >
              <v-icon left> mdi-plus </v-icon>Novo Lanche
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="12" sm="12" xs="12">
            <v-card class="pa-2" outlined tile>
              <v-data-table
                :headers="headers"
                :items="lanches"
                :search="search"
                id="tableLanches"
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
        <v-card-title v-show="!lanche.id" class="headline">
          <v-icon left> mdi-plus </v-icon>Novo Lanche
        </v-card-title>
        <v-card-title v-show="lanche.id" class="headline">
          <v-icon left> mdi-pencil </v-icon>Editar Lanche
        </v-card-title>

        <v-card-text>
          <v-form ref="formLanche" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <input type="hidden" v-model="lanche.id" />
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="lanche.name"
                    required
                    :rules="campoObrigatorio"
                    id="inputName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="select-ingredientes">
                  <v-select
                    v-model="lanche.ingredientes"
                    :items="ingredientes"
                    item-text="name"
                    item-value="name"
                    :menu-props="{ maxHeight: '400' }"
                    label="Selecione"
                    multiple
                    hint="Selecione os ingredientes"
                    persistent-hint
                    id="selectIngredientes"
                  ></v-select>
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
            @click="saveLanche"
            :disabled="!valid"
            id="btnSalvarLanche"
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
  name: "Lanches",
  data() {
    return {
      valid: true,
      campoObrigatorio: [(v) => !!v || "Campo obrigatório"],
      search: "",
      dialog: false,
      dialogImgLanche: false,
      lanche: { id: null, name: "", ingredientes: [], value: "" },
      btnAtualizarTabela: false,
      loader: null,

      headers: [
        { text: "LANCHE", value: "name" },
        { text: "INGREDIENTES", value: "ingredientes" },
        { text: "AÇÂO", value: "actions", sortable: false, align: "center" },
      ],
      lanches: [],
      ingredientes: [],
    };
  },
  methods: {
    selecionarImgLanche(img) {
        console.log('Img: ', img)
      this.dialogImgLanche = false;
    },
    navigate(link) {
      window.location.href = link;
    },
    editIngre(item) {
      this.openCloseDialog();
      this.lanche = item;
    },
    deleteIngre(item) {
      this.lanches.splice(this.lanches.indexOf(item), 1);
      this.$localStorage.set("lanches", JSON.stringify(this.lanches));
    },
    openDialogImgLanche() {
      this.dialogImgLanche = !this.dialogImgLanche;
    },
    openCloseDialog() {
      if (!this.dialog) this.lanche = {};
      this.dialog = !this.dialog;
    },
    saveLanche() {
      this.$refs.formLanche.validate();

      if (this.lanche.ingredientes && this.lanche.name) {
        if (this.lanche.id) {
          this.deleteIngre(this.lanche);
        }

        this.lanches.push({
          id: Date.now(),
          name: this.lanche.name,
          ingredientes: this.lanche.ingredientes,
        });

        this.$localStorage.set("lanches", JSON.stringify(this.lanches));

        this.openCloseDialog();
      }
    },
    initialize() {
      let dadosIngredientes = JSON.parse(
        this.$localStorage.get("ingredientes")
      );
      if (dadosIngredientes) {
        this.ingredientes = dadosIngredientes;
      }

      let dadosLanches = JSON.parse(this.$localStorage.get("lanches"));
      if (dadosLanches) {
        this.lanches = dadosLanches;
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