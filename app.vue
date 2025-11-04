<template>
  <div class="h-auto">
    <div class="h-64 bg-indigo-300 text-center flex flex-col items-center p-5">
      <h1 class="h-min bg-blue-600 text-center rounded-full flex flex-col p-4">
        My Movie WatchList
      </h1>
      <div class="flex flex-col gap-5 my-5">
        <Button label="Add Movie" @click="addVisible = true" />
        <Button label="Delete Movie" @click="deleteVisible = true" />
      </div>
    </div>

    <div class="card max-w-4xl mx-auto mt-20 bg-white rounded-lg shadow-lg">
      <div v-if="pending">Loading movies...</div>
      <MovieTable
        class=""
        v-else
        :movies="movies"
        @editMovie="openEditDialog"
      />
    </div>
  </div>

  <!-- 
    Here we listen for the @addMovie event from the dialog
    and tell it to run our 'handleAddNewMovie' function.
  -->
  <AddMovieDialog v-model:visible="addVisible" @addMovie="handleAddNewMovie" />

  <DeleteMovieDialog
    v-model:visible="deleteVisible"
    @deleteMovie="handleDeleteMovie"
  />

  <EditMovieDialog
    v-model:visible="editVisible"
    :movie="movieToEdit"
    @updateMovie="handleUpdateMovie"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
// the typing that is used for the movies
import type { IMovie } from "~/types/movieTypes";

import DeleteMovieDialog from "./components/DeleteMovieDialog.vue";
import EditMovieDialog from "./components/EditMovieDialog.vue";

// For the add button ref to show up
const addVisible = ref(false);
// This is for the delete button ref to show up
const deleteVisible = ref(false);

const editVisible = ref(false);
const movieToEdit = ref<IMovie | null>(null);

// 1. This is to get the movies from the database. Makes a get request
// it is called refresh because when movies are added or deleted we refresh to get the new list of movies
const {
  data: movies,
  pending,
  refresh,
} = await useAsyncData<IMovie[]>("movies", () => $fetch("/api/movies"));

// 2. This function is called when the dialog emits "addMovie"
async function handleAddNewMovie(newMovieData: Omit<IMovie, "id">) {
  // 1. Call your new POST API endpoint
  await $fetch("/api/movies", {
    method: "post",
    body: newMovieData,
  });
  // 2. Call 'refresh()' to re-fetch the movie list
  //    This makes the new movie appear in the table so user doesn't have to refresh
  await refresh();
}

function openEditDialog(movie: IMovie) {
  movieToEdit.value = movie; // Store the movie to be edited
  editVisible.value = true; // Open the dialog
}

//3. Delete function is called when dialog emits 'deleteMovie'
async function handleDeleteMovie(movieCode: string) {
  //1. Call the delete API endpoint
  await $fetch(`/api/movies/${movieCode}` as string, {
    method: "delete",
  });
  //2. Call refresh to re-fetch the movie list
  await refresh();
}

// 4. NEW: Function to handle the update
async function handleUpdateMovie(movieData: IMovie) {
  // Use the movie's code to build the URL
  await $fetch(`/api/movies/${movieData.code}` as string, {
    method: "put",
    body: movieData, // Send the updated data
  });

  // Hide the dialog and refresh the list
  editVisible.value = false;
  await refresh();
}
</script>
