const graphql = require('graphql');
const _= require('lodash');

const {
   GraphQLSchema,
   GraphQLObjectType,
   GraphQLString,
   GraphQLID
} = graphql;

// dummy data
var books = [
   { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
   { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({ // having function instead of just object beacuse it will have reference error when we add some other thing that is defined in other place and not defined before this has called
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString }
   })
});

// define root query which will defines number of ways the queries will be done
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: { // doesn't matter with order so do not need function
      book: {
         type: BookType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            // code to get data from db / other source
            return _.find(books, { id: args.id }); // using lodash
         }
      }
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery
});