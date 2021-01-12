import React from 'react'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>     
          <h1>Your Movie List</h1>
          <MovieList/>
          <AddMovie/>
    </ApolloProvider>


  );
}

export default App;
