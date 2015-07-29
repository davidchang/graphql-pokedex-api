This is a very simple Pokedex backend API built with Node, Express, GraphQL, and Babel.

It's just meant for learning and should be complemented by a series of articles on [http://davidandsuzi.com](http://davidandsuzi.com).

### Running

```
npm install
node index
```

### Dependencies

A MongoDB instance running locally (```sudo mongod```) is required to run any of the user related queries and mutations (the pokemon root query, which uses in-memory data, works independent of MongoDB).