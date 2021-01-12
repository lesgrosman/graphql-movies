export interface Movie {
    id: string,
    name: string,
    genre: string,
    director: {
        name: string,
        age: number
        movies: Movie[]
    }
}

export interface MovieDetailProps {
    movieData: {
        loading: boolean,
        error: any,
        data: any
    }
}

///////////////////////////////////

export interface Director {
    id: string,
    name: string,
    age: number
}

export interface DirectorData {
    directors: Director[]
}

export interface MovieInfo {
    id: string,
    name: string,
    genre: string,
    directorId: string  
}

export interface PostMovieVars {
    name: string,
    genre: string,
    directorId: string
}

////////////////// Movie List


export interface MovieVars {
    id: string
}

export interface MoviesData {
    movies: Movie[]
}

export interface MovieObject {
    loading: boolean,
    error: any,
    data: any
}