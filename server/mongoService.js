let MongoClient = require('mongodb').MongoClient;

// Connection URL
const MONGO_URL = 'mongodb://localhost:27017/pokedex';

export const query = cb => {

  // Use connect method to connect to the Server
  MongoClient.connect(MONGO_URL, (err, db) => {
    return cb(db);
  });

};