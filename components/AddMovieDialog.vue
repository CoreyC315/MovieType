<script setup lang="ts">
// Import 'reactive' to hold all the form data
import { reactive } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

// 1. Use a single reactive object to hold all the form fields
const movieData = reactive({
  name: "",
  genre: "",
  year: "",
  code: "",
});

// 2. Define the prop it RECEIVES from the parent
const props = defineProps<{
  visible: boolean;
}>();

// 3. Define the events it can SEND to the parent
//    We add "addMovie" to this list
const emit = defineEmits(["update:visible", "addMovie"]);

// 4. Create the function to call on button click
const handleAddMovie = () => {
  // 5. Emit the "addMovie" event WITH the movie data
  //    We send a copy ({ ...movieData })
  emit("addMovie", { ...movieData });

  // 6. After emitting, close the dialog
  emit("update:visible", false);

  // 7. And clear the form for the next time it's opened
  movieData.name = "";
  movieData.genre = "";
  movieData.year = "";
  movieData.code = "";
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="emit('update:visible', false)"
    modal
    header="Add a movie!"
    :style="{ width: '25rem' }"
  >
    <!-- This layout uses flex-col for spacing -->
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
          class="w-full"
        />
      </div>
      <div>
        <!-- This button triggers the handleAddMovie function -->
        <Button class="bg-blue-500 p-4 w-full" @click="handleAddMovie">
          Add Movie
        </Button>
      </div>
    </div>
  </Dialog>
</template>
