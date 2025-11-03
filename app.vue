<template>
  <div class="h-screen">
    <div class="h-1/2 bg-gray-500 text-center flex flex-col items-center">
      <h1
        class="rounded-lg bg-green-500 p-4 shadow-md border-2 border-black-500 mb-4"
      >
        My Movie WatchList
      </h1>

      <Button
        class="bg-blue-500 p-4"
        label="Add Movie"
        @click="addVisible = true"
      />
      <Button
        class="bg-red-500 p-4"
        label="Delete Movie"
        @click="deleteVisible = true"
      />
    </div>

    <div class="card">
      <div v-if="pending">Loading movies...</div>
      <MovieTable v-else :movies="movies" />
    </div>
  </div>

  <!-- 
    Here we LISTEN for the @addMovie event from the dialog
    and tell it to run our 'handleAddNewMovie' function.
  -->
  <AddMovieDialog v-model:visible="addVisible" @addMovie="handleAddNewMovie" />

  <DeleteMovieDialog
    v-model:visible="deleteVisible"
    @deleteMovie="handleDeleteMovie"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
// the typing that is used for the movies
import type { IMovie } from "~/types/movieTypes";

import DeleteMovieDialog from "./components/DeleteMovieDialog.vue";

// For the add button ref to show up
const addVisible = ref(false);
// This is for the delete button ref to show up
const deleteVisible = ref(false);

// 1. This is to get the movies from the database. Makes a get request
// it is called refresh because when movies are added or deleted we refresh to get the new list of movies
const {
  data: movies,
  pending,
  refresh,
} = await useAsyncData<IMovie[]>("movies", () => $fetch("/api/movies/"));

// 2. This function is called when the dialog emits "addMovie"
async function handleAddNewMovie(newMovieData: Omit<IMovie, "id">) {
  // 1. Call your new POST API endpoint
  await $fetch("/api/movies/", {
    method: "post",
    body: newMovieData,
  });
  // 2. Call 'refresh()' to re-fetch the movie list
  //    This makes the new movie appear in the table so user doesn't have to refresh
  await refresh();
}

//4. Delete function is called when dialog emits 'deleteMovie'
async function handleDeleteMovie(movieCode: string) {
  //1. Call the delete API endpoint
  await $fetch(`/api/movies/${movieCode}`, {
    method: "delete",
  });
  //2. Call refresh to re-fetch the movie list
  await refresh();
}
</script>
