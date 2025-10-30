<template>
    <div class="h-screen">
        <div class="h-1/2 bg-gray-500 text-center flex flex-col items-center">
            <h1 class="rounded-lg bg-red-500 p-4 shadow-md border-2 border-black-500 mb-4">My Movie WatchList</h1>

            <Button class="bg-green-500 p-4" label="Add Movie" @click="visible = true" />

        </div>

        <div class="card">
    <DataTable 
        :value="movies" 
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

    </div>
    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <div>Add a movie!</div>
        <div>
            <button class="bg-green-500 p-4">
            Add Movie
        </button>
    </div>
    </Dialog>
</template>

<script setup lang="ts">
    //button imports
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';

    //datatable imports
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ColumnGroup from 'primevue/columngroup'; 
    import Row from 'primevue/row'; 
    import type { DataTableRowSelectEvent, DataTableRowUnselectEvent } from 'primevue/datatable';
    
    import {
        ref
    } from 'vue'; 

    // Define what a Movie looks like for TypeScript
    interface Movie {
      id: number;
      code: string;
      name: string;
      genre: string;
      year: number;
    }

    //set memory for the list of movies selected by user
    const selectedMovie = ref<Movie>();

    //for when you select a row
    const onRowSelect = (event: DataTableRowSelectEvent) => {
      console.log("Row Selected:", event.data.name);
    }
    
    
    //when you unselect the row.
    const onRowUnselect = (event: DataTableRowUnselectEvent) => {
      console.log("Row Unselected:", event.data.name);
    }

    // Fetch the movies from your new API endpoint
    // 'movies' will be a ref containing your data from the database
    // 'pending' is a boolean you can use to show a loading spinner
    const { data: movies, pending } = await useAsyncData<Movie[]>('movies', () =>   
    $fetch('/api/movies')
    );

    const visible = ref(false);

    var number = 0;

    function click() {
        console.log(`your number is ${number}`);
        number += 1
    }
</script>