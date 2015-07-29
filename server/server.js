import express from 'express';
import schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

let app  = express();

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql(schema, req.body)
    .then(result => res.send(result));
});

let server = app.listen(
  3000,
  () => console.log(`GraphQL running on port ${server.address().port}`)
);
