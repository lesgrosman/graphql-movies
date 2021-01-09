const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://lesgrosman:19718131Les@cluster0.5uv73.mongodb.net/graphql-movies?retryWrites=true&w=majority')

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`ERRRRRRRRRRROOOOOOOOOORRRRR: ${err}`))
dbConnection.once('open', () => console.log('connected to database'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})
