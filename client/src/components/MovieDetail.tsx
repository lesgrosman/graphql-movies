import React from 'react'

interface Movie {
    id: string,
    name: string,
    genre: string,
    director: {
        name: string,
        age: number
        movies: Movie[]
    }
}

interface Props {
    movieData: {
        loading: boolean,
        error: any,
        data: any
    }
}

interface Data {
    movie: Movie
}

const MovieDetail: React.FC<Props> = ({ movieData }) => {
   
    const {loading, error, data} = movieData

    if (!data) return null
    if (loading) return <h4>Loading</h4>
    if (error || !data) return <h4>Error</h4>

    const { movie }: {movie: Movie} = data

    return (
        <div> 
            <h2>{movie.name}</h2>
            <h4>{movie.genre}</h4>
            <h4>{movie.director.name}</h4>
            <ul>
                {movie.director.movies.map((movie: Movie) => {
                    return (
                        <li key={movie.id}>{movie.name}</li>
                    )
                })}
            </ul>

        </div>
    )
}

export default MovieDetail
