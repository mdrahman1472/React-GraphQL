const express = require('express');
const graphqlHTTP = require('express-graphql'); // allow express to understand graphql
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

app.listen(4000, () => {
   console.log('Listening for request at port 4000');
});
