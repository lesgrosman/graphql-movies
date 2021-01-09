const graphql = require('graphql')
const Movie = require('../models/movie')
const Director = require('../models/director')

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

// const movies = [
//   { id: '1', name: 'Pulp Fiction', genre: 'Action', directorId: '1' },
//   { id: '2', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Criminal', directorId: '2' },
//   { id: '3', name: 'Alien', genre: 'Horror', directorId: '3' },
//   { id: '4', name: 'Superbad', genre: 'Comedy', directorId: '4' },
//   { id: '5', name: 'Kill Bill', genre: 'Action', directorId: '1' },
//   { id: '6', name: 'Snatch', genre: 'Criminal', directorId: '2' },
//   { id: '7', name: 'Inglourious Basterds', genre: 'History', directorId: '1' },
//   { id: '8', name: 'Django Unchained', genre: 'Comedy', directorId: '1' }
// ]

// const directors = [
//   { id: '1', name: 'Tarantino', age: 55 }, // 5fc6c08b280605337612e85c
//   { id: '2', name: 'Richie', age: 70 }, // 5fc6c116280605337612e85d
//   { id: '3', name: 'Scott', age: 68 }, //5fc6c150280605337612e85e
//   { id: '4', name: 'Motolla', age: 43 } //5fc6c16d280605337612e85f
// ]

///// Types of Objects

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent) {
                // return directors.find(director => parent.id === director.id)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent) {
                // return movies.filter(movie => parent.id === movie.directorId)
            }
        }

    })
})

////////////// Query ///////////////

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(args) {
                // Getting data from db
                // return movies.find(movie => movie.id === args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(args) {
                // Getting data from db
                // return directors.find(director => director.id === args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve() {
                // return movies
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve() {
                // return directors
            }
        }
    }
})

////// Mutations //////////

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let director = new Director({
                    name: args.name,
                    age: args.age
                })
                return director.save()
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save()
            }
        }
    } 
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})