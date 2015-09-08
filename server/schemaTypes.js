import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

export const PokemonType = new GraphQLObjectType({
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

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the User.',
    },
    caught: {
      type: new GraphQLList(GraphQLString),
      description: 'The Pokemon that have been caught by the User.',
    },
    created: {
      type: GraphQLInt,
      description: 'The creation timestamp of the User.'
    }
  })
});