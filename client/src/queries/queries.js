import { gql } from '@apollo/client'

const GET_DIRECTORS = gql`
    query getDirectors {
        directors {
            name
            age
            id
        }
    }
`

const GET_MOVIES = gql`
    query getMovies {
        movies {
            name
            genre
            id
        }
    }
`

const ADD_MOVIE = gql`
    mutation addMovie($name: String!, $genre: String!, $directorId: ID!) {
        addMovie(name: $name, genre: $genre, directorId: $directorId) {
            name
            id
        }
    }
`

const GET_MOVIE = gql`
    query getMovie($id: ID!) {
        movie(id: $id) {
            id
            name
            genre
            director {
                name
                age
                movies {
                    name
                    genre
                }
            }
        }
    }
`

export { GET_DIRECTORS,  GET_MOVIES, ADD_MOVIE, GET_MOVIE }