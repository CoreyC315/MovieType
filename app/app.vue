<template>
    <div class="h-screen">
        <div class="h-1/2 bg-gray-500 text-center flex flex-col items-center">
            <h1 class="rounded-lg bg-red-500 p-4 shadow-md border-2 border-black-500 mb-4">My Movie WatchList</h1>

            <Button class="bg-green-500 p-4" label="Show" @click="visible = true" />

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
        <div>Hello</div>
    </Dialog>
</template>

<script setup>
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';

    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ColumnGroup from 'primevue/columngroup'; 
    import Row from 'primevue/row'; 
    import {
        ref
    } from 'vue'; 

    //set memory for the list of movies selected by user
    const selectedMovie = ref();

    //for when you select a row
    const onRowSelect = (event) => {
      console.log("Row Selected:", event.data)
    }
    
    
    //when you unselect the row.
    const onRowUnselect = (event) => {
      console.log("Row Unselected:", event.data)
    }

    //Set up the movies to be called
    const movies = ref([
        {
            "code": "001",
            "name": "The Shawshank Redemption",
            "genre": "Drama",
            "year": 1994
        },
        {
            "code": "002",
            "name": "The Godfather",
            "genre": "Crime, Drama",
            "year": 1972
        },
        {
            "code": "003",
            "name": "The Dark Knight",
            "genre": "Action, Crime, Drama",
            "year": 2008
        },
        {
            "code": "004",
            "name": "Pulp Fiction",
            "genre": "Crime, Drama",
            "year": 1994
        },
        {
            "code": "005",
            "name": "Inception",
            "genre": "Sci-Fi, Action",
            "year": 2010
        }
    ]);

    const visible = ref(false);

    var number = 0;

    function click() {
        console.log(`your number is ${number}`);
        number += 1
    }
</script>