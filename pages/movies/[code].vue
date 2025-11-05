<script setup lang="ts">
import Button from "primevue/button";
import type { IMovie } from "~/types/movieTypes";

//1. Get the current route to access the URL parameters
const route = useRoute();

//2. Get [code] from the URL
const movieCode = route.params.code as string;

//3. Fetch the API data
const {
  data: movie,
  pending,
  error,
} = await useAsyncData<IMovie>(`movie-${movieCode}`, () =>
  $fetch(`/api/movies/${movieCode}`)
);

//placeholder function for right now
function addToList() {
  if (movie.value) {
    alert(`Adding ${movie.value.name} to your list!`);
    //This is for when you want to add the movie to a watch list
  }
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

      <p class="text-base mb-8">{{ movie.description }}</p>

      <Button label="Add to My List" icon="pi pi-plus" @click="addToList" />

      <hr class="my-8" />

      <NuxtLink to="/" class="text-blue-600 hover:underline"
        >&larr; Back to all movies</NuxtLink
      >
    </article>
  </div>
</template>
