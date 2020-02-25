const express = require('express');
const graphqlHTTP = require('express-graphql'); // allow express to understand graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const URI = 'mongodb+srv://dbUser:dbUser@cluster0-fbve5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.disconnect();

// connect to mlab database
mongoose.connect(URI, 
   {  
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
   })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// Event listner to whck one connection open
mongoose.connection.once('open', () => {
   console.log('conneted to database');
});

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

app.listen(4000, () => {
   console.log('Listening for request at port 4000');
});
