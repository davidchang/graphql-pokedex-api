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
import { mongo } from './mongoService';

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

          return mongo()
            .then(db => {
              let deferred = Q.defer();

              let collection = db.collection('users');
              collection.find({ name })
                .toArray((err, docs) => {
                  if (err) {
                    deferred.reject(err);
                    return;
                  }

                  db.close();
                  deferred.resolve(docs.length ? docs[0] : null);
                });

              return deferred.promise;
            });

        }
      }
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      upsertUser: {
        type: UserType,
        args: {
          name: {
            description: 'The name of the user',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (obj, {name}) => {

          let toCreate = {
            name,
            caught: [],
            created: new Date().valueOf()
          };

          return mongo()
            .then(db => {
              let deferred = Q.defer();

              let collection = db.collection('users');

              collection.find({ name })
                .toArray((err, docs) => {
                  if (docs.length) {
                    db.close();
                    return deferred.resolve(docs[0]);
                  }

                  collection.insert(toCreate, (err, result) => {
                    db.close();

                    if (err) {
                      deferred.reject(err);
                      return;
                    }

                    deferred.resolve(toCreate);
                  });
                });

              return deferred.promise;
            });

        }
      }
    }
  })
});

export default schema;
