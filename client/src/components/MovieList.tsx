import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import MovieDetail from './MovieDetail'
import { GET_MOVIES, GET_MOVIE } from '../queries/queries'

interface Movie {
    id: string,
    name: string,
    genre: string
    director: {
        name: string
        age: number
    }
}

interface MovieVars {
    id: string
}

interface MoviesData {
    movies: Movie[]
}

interface MovieObject {
    loading: boolean,
    error: any,
    data: any
}


const MovieList:React.FC = () => {

    const { loading, error, data } = useQuery<MoviesData>(GET_MOVIES)
    const [getMovie, movie_data ] = useLazyQuery<Movie, MovieVars>(GET_MOVIE)
    
    const movieObject: MovieObject = {
        loading: movie_data.loading,
        error:  movie_data.error!,
        data: movie_data.data!
    }

    console.log(movie_data)
    if (!data) return null
    if (loading) return <span>Loading</span>
    if (error) return <span>Error</span>

    return (
        <div>
            <ul>
                {data!.movies.map((movie: Movie) => {
                    return (
                        <li key={movie.id} onClick={() => getMovie({variables: {id: movie.id}})}>
                            {movie.name}({movie.genre})
                        </li>
                    )
                })}
            </ul>
            <MovieDetail movieData={movieObject}/>
            <h1>List</h1>
        </div>
    )
}

export default MovieList