// get the typing of the movies
import { IMovie } from "./movieTypes";

export class WatchList{

    // Create the private variable for movies. Only code in the WatchList class can see it
    private movies: IMovie[];

    // Creates the variables for the function
    constructor() {
        this.movies = []
    }

    public addMovie(moviesToAdd: IMovie){
        this.movies.push(moviesToAdd)
    }

    public getMovies(): IMovie[]{
        return this.movies
    }
}