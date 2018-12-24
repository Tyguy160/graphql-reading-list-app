const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://tyler:test123@ds243084.mlab.com:43084/gql-ninja');
mongoose.connection.once('open', () => {
  console.log('Database connected');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Listening for requests on http://localhost:4000/graphql');
});
