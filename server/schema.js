// schema.js
import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql/lib/type';

import { Pokemon } from './Pokemon';

var PokemonObject = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'A Pokemon',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the Pokemon.',
    },
    type: {
      type: GraphQLString,
      description: 'The type of the Pokemon.',
    },
    stage: {
      type: GraphQLInt,
      description: 'The level of the Pokemon.',
    },
    species: {
      type: GraphQLString,
      description: 'The species of the Pokemon.',
    }
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      pokemon: {
        type: new GraphQLList(PokemonObject),
        resolve: () => Pokemon
      },
    }
  })
});

export default schema;
