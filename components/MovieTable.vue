<script setup lang="ts">
//imports for the DataTable to work
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type {
  DataTableRowSelectEvent,
  DataTableRowUnselectEvent,
} from "primevue/datatable";
import { ref } from "vue";

//types from types folder
import type { IMovie } from "~/types/movieTypes";

//1. Define the 'movies' prop that will recieve from the parent
const props = defineProps<{
  movies: IMovie[] | null | undefined;
}>();

const selectedMovie = ref<IMovie>();

//2. All selection logic in this
//for when you select a row
const onRowSelect = (event: DataTableRowSelectEvent) => {
  console.log("Row Selected:", event.data.name);
};

//when you unselect the row.
const onRowUnselect = (event: DataTableRowUnselectEvent) => {
  console.log("Row Unselected:", event.data.name);
};
</script>

<template>
  <div class="card">
    <DataTable
      :value="props.movies"
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      tableStyle="min-width: 50rem"
      v-model:selection="selectedMovie"
      selectionMode="single"
      dataKey="code"
    >
      <Column field="code" header="Unique Code"></Column>
      <Column field="name" header="Movie Name"></Column>
      <Column field="genre" header="Genre"></Column>
      <Column field="year" header="Year"></Column>
    </DataTable>
  </div>
</template>
