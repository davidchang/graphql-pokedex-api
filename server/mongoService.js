let MongoClient = require('mongodb').MongoClient;
let Q = require('q');

// Connection URL
const MONGO_URL = 'mongodb://localhost:27017/pokedex';

export const mongo = cb => {

  let deferred = Q.defer();

  // Use connect method to connect to the Server
  MongoClient.connect(MONGO_URL, (err, db) => {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve(db);
  });

  return deferred.promise;
};