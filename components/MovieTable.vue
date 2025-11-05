<script setup lang="ts">
//imports for the DataTable to work
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type {
  DataTableRowSelectEvent,
  DataTableRowUnselectEvent,
} from "primevue/datatable";
import { ref } from "vue";
// 1. Import Button for your new edit button
import Button from "primevue/button";

//types from types folder
import type { IMovie } from "~/types/movieTypes";

//2. Define the 'movies' prop that will recieve from the parent
const props = defineProps<{
  movies: IMovie[] | null | undefined;
}>();

// 3. Define the 'editMovie' event it can SEND to the parent
const emit = defineEmits(["editMovie"]);

const selectedMovie = ref<IMovie>();

//4. All selection logic in this
//for when you select a row
const onRowSelect = (event: DataTableRowSelectEvent) => {
  console.log("Row Selected:", event.data.name);
};

//when you unselect the row.
const onRowUnselect = (event: DataTableRowUnselectEvent) => {
  console.log("Row Unselected:", event.data.name);
};

// 5. Create a function to emit the movie data when edit is clicked
const onEditClick = (movie: IMovie) => {
  emit("editMovie", movie);
};
</script>

<template>
  <div class="card">
    <DataTable
      class=""
      :value="props.movies"
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      tableStyle="min-width: 50rem"
      v-model:selection="selectedMovie"
      selectionMode="single"
      dataKey="code"
    >
      <Column field="code" header="Unique Code"></Column>

      <Column field="name" header="Movie Name">
        <template #body="slotProps">
          <NuxtLink
            :to="`/movies/${slotProps.data.code}`"
            class="text-blue-600 hover:underline"
          >
            {{ slotProps.data.name }}
          </NuxtLink>
        </template>
      </Column>

      <Column field="genre" header="Genre"></Column>
      <Column field="year" header="Year"></Column>

      <Column header="Edit">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success"
            @click="onEditClick(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
