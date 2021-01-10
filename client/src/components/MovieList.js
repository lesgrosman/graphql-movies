import React, { useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import MovieDetail from './MovieDetail'
import { GET_MOVIES, GET_MOVIE } from '../queries/queries'

const MovieList = () => {

    const { loading, error, data } = useQuery(GET_MOVIES)
    const [getMovie, movie_data ] = useLazyQuery(GET_MOVIE)

    // const [movieId, setMovieId] = useState('')

    if (loading) return <span>Loading</span>
    if (error) return <span>Error</span>

    return (
        <div>
            <ul>
                {data.movies.map(movie => {
                    return (
                        <li key={movie.id} onClick={() => getMovie({variables: {id: movie.id}})}>
                            {movie.name}({movie.genre})
                        </li>
                    )
                })}
            </ul>
            <MovieDetail movieData={movie_data}/>
        </div>
    )
}

export default MovieList