import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_DIRECTORS, ADD_MOVIE, GET_MOVIES } from '../queries/queries'

const AddMovie = () => {

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [directorId, setDirector] = useState('')


    const {loading, error, data} = useQuery(GET_DIRECTORS)
    const [addMovie] = useMutation(ADD_MOVIE)


    const displayDirectors = () => {
        if (loading) return <option>Loading...</option>
        if (error) return <option> Error</option>

        return data.directors.map(director => {
            return (
                <option key={director.id} value={director.id}>
                    {director.name}
                </option>
            )
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(title, genre, directorId)
        addMovie({
            variables: {
                name: title,
                genre: genre,
                directorId: directorId
            },
            refetchQueries: [
                { query: GET_MOVIES }
            ]
        })

        setTitle('')
        setGenre('')
        setDirector('')
    }


    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label>Movie Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div>
                <label>Movie Genre</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}></input>
            </div>
            <select onChange={(e) => setDirector(e.target.value)}>
                <option>Select a director</option>
                {displayDirectors()}
            </select>
            <br/>
            <button type="submit">+</button>
        </form>
    )
}

export default AddMovie
