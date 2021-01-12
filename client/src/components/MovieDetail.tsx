import React from 'react'
import { Movie, MovieDetailProps } from '../interfaces/interfaces'

const MovieDetail: React.FC<MovieDetailProps> = ({ movieData }) => {
   
    const {loading, error, data} = movieData

    if (!data) return null
    if (loading) return <h4>Loading</h4>
    if (error || !data) return <h4>Error</h4>

    const { movie }: {movie: Movie} = data

    return (
        <> 
            <h1>{movie.name}</h1>
            <h5>{movie.genre}</h5>
            <h5>{movie.director.name}</h5>
            <h5>Other movies by this director:</h5>
            <ul>
                {movie.director.movies.map((movie: Movie) => {
                    return (
                        <li className="title" key={movie.id}>{movie.name}</li>
                    )
                })}
            </ul>
        </>
    )
}

export default MovieDetail
