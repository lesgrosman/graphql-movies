import React from 'react'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Hello</h1>
        <MovieList/>
        <AddMovie/>
      </div>
    </ApolloProvider>


  );
}

export default App;
