<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext"; // Import InputText
import Dialog from "primevue/dialog"; // Import Dialog
import { reactive } from "vue";

//1. Use a reactive object to hold the code you want to delete
const movieCode = reactive({
  code: "",
});

//2. Define the prop it recieves from the parent
const props = defineProps<{
  visible: boolean;
}>();

// 3. Define the events it can send to the parent
const emit = defineEmits(["update:visible", "deleteMovie"]);

// 4. Create event handler for when the button is pushed
const handleDeleteMovie = () => {
  // 5. Emit the "deleteMovie" event WITH the movie code
  emit("deleteMovie", movieCode.code);

  // 6. After emitting, close the dialog
  emit("update:visible", false);

  // 7. And clear the form
  movieCode.code = "";
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="emit('update:visible', false)"
    modal
    header="Delete a movie"
    :style="{ width: '25rem' }"
  >
    <div classs="flex flex-col gap-3">
      <div>
        <InputText
          type="text"
          v-model="movieCode.code"
          placeholder="Movie Code to Delete"
          class="w-full"
        />
      </div>
      <div class="mt-4">
        <Button class="bg-red-500 p-4 w-full" @click="handleDeleteMovie">
          Delete Movie
        </Button>
      </div>
    </div>
  </Dialog>
</template>
