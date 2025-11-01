<template>
  <div class="h-screen">
    <div class="h-1/2 bg-gray-500 text-center flex flex-col items-center">
      <h1
        class="rounded-lg bg-red-500 p-4 shadow-md border-2 border-black-500 mb-4"
      >
        My Movie WatchList
      </h1>

      <Button
        class="bg-blue-500 p-4"
        label="Add Movie"
        @click="visible = true"
      />
    </div>

    <div class="card">
      <!-- 
        If 'pending' is true, show a loading message.
        Otherwise, show the MovieTable component.
      -->
      <div v-if="pending">Loading movies...</div>
      <MovieTable v-else :movies="movies" />
    </div>
  </div>

  <!-- 
    Here we LISTEN for the @addMovie event from the dialog
    and tell it to run our 'handleAddNewMovie' function.
  -->
  <AddMovieDialog v-model:visible="visible" @addMovie="handleAddNewMovie" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
// Assuming IMovie is in this types file
import type { IMovie } from "~/types/movieTypes";

// 1. Get the 'refresh' function from useAsyncData
const {
  data: movies,
  pending,
  refresh,
} = await useAsyncData<IMovie[]>("movies", () => $fetch("/api/movies"));

// This ref still controls the dialog visibility
const visible = ref(false);

// 2. This function is called when the dialog emits "addMovie"
async function handleAddNewMovie(newMovieData: Omit<IMovie, "id">) {
  // 3. Call your new POST API endpoint
  await $fetch("/api/movies", {
    method: "POST",
    body: newMovieData,
  });

  // 4. Call 'refresh()' to re-fetch the movie list
  //    This makes the new movie appear in the table!
  await refresh();
}
</script>
