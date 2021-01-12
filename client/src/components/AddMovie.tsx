import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_DIRECTORS, ADD_MOVIE, GET_MOVIES } from '../queries/queries'
import { Director, DirectorData, MovieInfo, PostMovieVars } from '../interfaces/interfaces'

const AddMovie: React.FC = () => {

    const [name, setTitle] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const [directorId, setDirector] = useState<string>('')


    const {loading, error, data} = useQuery<DirectorData>(GET_DIRECTORS)
    const [addMovie] = useMutation<MovieInfo, PostMovieVars>(ADD_MOVIE)


    const displayDirectors = () => {
        if (loading) return <option>Loading...</option>
        if (error) return <option> Error</option>

        return data!.directors.map((director: Director) => {
            return (
                <option key={director.id} value={director.id}>
                    {director.name}
                </option>
            )
        })
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        addMovie({
            variables: {
                name: name,
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
        <form onSubmit={onSubmitHandler} className="addform">
            <div className="field">
                <label>Movie Title</label>
                <input type="text" value={name} onChange={(event : React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}></input>
            </div>
            <div className="field">
                <label>Movie Genre</label>
                <input type="text" value={genre} onChange={(event : React.ChangeEvent<HTMLInputElement>) => setGenre(event.target.value)}></input>
            </div>
            <select onChange={(e : React.ChangeEvent<HTMLSelectElement>) => setDirector(e.target.value)}>
                <option>Select a director</option>
                {displayDirectors()}
            </select>
            <br/>
            <button type="submit">+</button>
        </form>
    )
}

export default AddMovie
