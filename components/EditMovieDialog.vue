<script setup lang="ts">
// Import 'reactive' to hold all the form data
import { reactive } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import type { IMovie } from "~/types/movieTypes";

// 1. Use a single reactive object to hold all the form fields
const movieData = reactive({
  name: "",
  genre: "",
  year: "",
  code: "",
  id: 0,
  description: "",
});

// 2. Define the prop it RECEIVES from the parent
const props = defineProps<{
  visible: boolean;
  //It recieves a 'movie' object to edit
  movie: IMovie | null;
}>();

// 3. Define the events it can SEND to the parent
const emit = defineEmits(["update:visible", "updateMovie"]);

// 4. Using WatchEffect. This triggers whenever props.movie changes
// It copies the prop data into local 'movieData' form

watchEffect(() => {
  if (props.movie) {
    movieData.id = props.movie.id;
    movieData.name = props.movie.name;
    movieData.genre = props.movie.genre;
    movieData.year = props.movie.year.toString();
    movieData.code = props.movie.code;
    movieData.code = props.movie.description || "";
  }
});

const handleUpdateMovie = () => {
  // 5. Emit the "addMovie" event WITH the movie data
  //    We send a copy ({ ...movieData })
  emit("updateMovie", { ...movieData });

  // 6. After emitting, close the dialog
  emit("update:visible", false);
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="emit('update:visible', false)"
    modal
    header="Edit movie"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-3">
      <div>
        <InputText
          type="text"
          v-model="movieData.name"
          placeholder="Movie Name"
          class="w-full"
        />
      </div>
      <div>
        <InputText
          type="text"
          v-model="movieData.genre"
          placeholder="Genre"
          class="w-full"
        />
      </div>
      <div>
        <InputText
          type="text"
          v-model="movieData.year"
          placeholder="Year"
          class="w-full"
        />
      </div>
      <div>
        <InputText
          type="text"
          v-model="movieData.code"
          placeholder="Unique Code"
          class="w-full bg-gray-200"
          :disabled="true"
        />
      </div>
      <div>
        <Textarea
          v-model="movieData.description"
          placeholder="Description"
          rows="5"
          class="w-full"
        />
      </div>
      <div>
        <Button class="bg-green-500 p-4 w-full" @click="handleUpdateMovie">
          Save Changes
        </Button>
      </div>
    </div>
  </Dialog>
</template>
