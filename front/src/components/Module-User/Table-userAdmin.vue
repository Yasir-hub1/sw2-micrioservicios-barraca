<template>
  <div class="col-12 mt-3">
    <card :title="table1.title" :subTitle="table1.subTitle">
      <div slot="raw-content" class="table-responsive">
        <paper-table :data="table1.data" :columns="table1.columns">
        </paper-table>
      </div>
    </card>
  </div>
</template>


<script>
import { PaperTable } from "@/components";

const tableColumns = ["Id", "Name", "Salary", "Country", "City"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  // Resto de tus datos de tabla aquí
];

export default {
  name:"Table-userAdmin",
  components: {
    PaperTable
  },
  data() {
    return {
      activeTab: 'admin', // Define la pestaña activa por defecto
      table1: {
        title: "Usuarios",
        subTitle: "Administra tus usuarios",
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  methods: {
    stateTab(tab) {
      console.log("tab ", tab)
      this.activeTab = tab;
    },
  },
};
</script>
