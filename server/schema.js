// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql/lib/type';

import { Pokemon } from './Pokemon';
import { PokemonType, UserType } from './schemaTypes';
import { query } from './mongoService';

let Q = require('q');

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      pokemon: {
        type: new GraphQLList(PokemonType),
        resolve: () => Pokemon
      },
      user: {
        type: UserType,
        args: {
          name: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {name}) => {
          let deferred = Q.defer();

          query(db => {
            // Get the documents collection
            var collection = db.collection('pokedex');
            // Find some documents
            collection.find({ name })
              .toArray((err, docs) => {
                if (err) {
                  deferred.reject(err);
                  return;
                }

                db.close();
                deferred.resolve(docs.length ? docs[0] : null);
              });
          });

          return deferred.promise;
        }
      }
    }
  })
});

export default schema;
