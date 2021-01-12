import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import MovieDetail from './MovieDetail'
import { GET_MOVIES, GET_MOVIE } from '../queries/queries'
import { Movie, MovieVars, MoviesData, MovieObject } from '../interfaces/interfaces'


const MovieList:React.FC = () => {

    const { loading, error, data } = useQuery<MoviesData>(GET_MOVIES)
    const [getMovie, movie_data ] = useLazyQuery<Movie, MovieVars>(GET_MOVIE)
    
    const movieObject: MovieObject = {
        loading: movie_data.loading,
        error:  movie_data.error!,
        data: movie_data.data!
    }

    if (!data) return null
    if (loading) return <span>Loading</span>
    if (error) return <span>Error</span>

    return (
        <div>
            <ul className="list">
                {data!.movies.map((movie: Movie) => {
                    return (
                        <li key={movie.id} onClick={() => getMovie({variables: {id: movie.id}})}>
                            {movie.name}
                        </li>
                    )
                })}
            </ul>
            <div className="details">
                <MovieDetail movieData={movieObject}/>
            </div>
        </div>
    )
}

export default MovieList