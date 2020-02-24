const express = require('express');
const graphqlHTTP = require('express-graphql'); // allow express to understand graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const URI = 'mongodb+srv://dbUser:dbUser@cluster0-fbve5.mongodb.net/test?retryWrites=true&w=majority';
// const URI = 'mongodb://md:test1234@cluster0-shard-00-00-yyifa.mongodb.net:27017,cluster0-shard-00-01-yyifa.mongodb.net:27017,cluster0-shard-00-02-yyifa.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
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
// mongoose.connection.once('open', () => {
//    console.log('conneted to database');
// });
// const db = mongoose.connection;
// db.on("error", () => {
//     console.log("> error occurred from the database");
// });
// db.once("open", () => {
//     console.log("> successfully opened the database");
// });


// const connectDB = async () => {
//    await mongoose.connect(URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//    });
//    console.log('db Connected')
// }

// connectDB();
app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

app.listen(3000, () => {
   console.log('Listening for request at port 3000');
});
