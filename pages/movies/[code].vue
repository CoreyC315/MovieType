<script setup lang="ts">
import Button from "primevue/button";
import type { IMovie } from "~/types/movieTypes";
import { ref } from "vue";
import EditMovieDialog from "~/components/EditMovieDialog.vue";

//1. Get the current route to access the URL parameters
const route = useRoute();

//2. Get [code] from the URL
const movieCode = route.params.code as string;

const editVisible = ref(false);

// --- PROBLEM 1 FIX: ---
// You only need ONE useAsyncData call.
// We need the 'refresh' function from it.
const {
  data: movie,
  pending,
  error,
  refresh,
} = await useAsyncData<IMovie>(`movie-${movieCode}`, () =>
  $fetch(`/api/movies/${movieCode}`)
);

// (The duplicate useAsyncData call has been removed)

//placeholder function for right now
function addToList() {
  if (movie.value) {
    alert(`Adding ${movie.value.name} to your list!`);
    //This is for when you want to add the movie to a watch list
  }
}

// --- PROBLEM 2 FIX: ---
// The logic to close the dialog and refresh
// MUST be INSIDE the function.
async function handleUpdateMovie(movieData: IMovie) {
  await $fetch(`/api/movies/${movieCode}`, {
    method: "PUT", // <-- Good practice to use PUT
    body: movieData,
  });

  // These lines were outside the function, now they are inside:
  editVisible.value = false;
  await refresh();
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <div v-if="pending">
      <p>Loading movie details...</p>
    </div>

    <div v-else-if="error || !movie">
      <h1 class="text-3xl font-bold text-red-600">Movie not found</h1>
      <p>Sorry, we couldn't find that movie.</p>
      <NuxtLink to="/" class="text-blue-600 hover:underline mt-4 inline-block"
        >&larr; Back to movie list</NuxtLink
      >
    </div>

    <article v-else>
      <h1 class="text-4xl font-bold mb-2">
        {{ movie.name }} ({{ movie.year }})
      </h1>
      <p class="text-lg italic text-gray-700 mb-6">{{ movie.genre }}</p>

      <p v-if="movie.description" class="text-base mb-8">
        {{ movie.description }}
      </p>
      <p v-else class="text-base mb-8 italic text-gray-500">
        No description available.
      </p>

      <div class="flex gap-4">
        <Button label="Add to My List" icon="pi pi-plus" @click="addToList" />

        <Button
          label="Edit Details"
          icon="pi pi-pencil"
          @click="editVisible = true"
          class="p-button-secondary"
        />
      </div>

      <hr class="my-8" />

      <NuxtLink to="/" class="text-blue-600 hover:underline"
        >&larr; Back to all movies</NuxtLink
      >
    </article>
  </div>

  <EditMovieDialog
    v-if="movie"
    v-model:visible="editVisible"
    :movie="movie"
    @updateMovie="handleUpdateMovie"
  />
</template>
