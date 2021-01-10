import React from 'react'

const MovieDetail = ({movieData}) => {
   
    const { loading, error, data } = movieData

    if (!data) return null
    if (loading) return <h4>Loading</h4>
    if (error || !data) return <h4>Error</h4>

    const { movie } = data



    return (
        <div> 
            <h2>{movie.name}</h2>
            <h4>{movie.genre}</h4>
            <h4>{movie.director.name}</h4>
            <ul>
                {movie.director.movies.map(movie => {
                    return (
                        <li key={movie.id}>{movie.name}</li>
                    )
                })}
            </ul>


        </div>
    )
}

export default MovieDetail