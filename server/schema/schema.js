const graphql = require('graphql');
const _= require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
   GraphQLSchema,
   GraphQLObjectType,
   GraphQLString,
   GraphQLID,
   GraphQLInt,
   GraphQLList
} = graphql;

/* using real database now
// dummy data
let books = [
   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

let authors = [
   { name: 'Patrick Rothfuss', age: 44, id: '1' },
   { name: 'Brandon Sanderson', age: 42, id: '2' },
   { name: 'Terry Pratchett', age: 66, id: '3' }
];
*/

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({ // having function instead of just object beacuse it will have reference error when we add some other thing that is defined in other place and not defined before this has called
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args) {
            // return _.find(authors, { id: parent.authorId})
         } 
      }
   })
});

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id: {type: GraphQLID },
      name: {type: GraphQLString },
      age: { type: GraphQLInt },
      book: {
         type: new GraphQLList(BookType), // authors might have multiple books
         resolve(parent, args) {
            // return _.filter(books, { authorId: parent.id})
         }
      }
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
            // return _.find(books, { id: args.id }); // using lodash
         }
      },
      author: {
         type: AuthorType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            // return _.find(authors, { id: args.id })
         }
      },
      books: {
         type: new GraphQLList(BookType),
         resolve () {
            // return books;
         }
      },
      authors: {
         type: new GraphQLList(AuthorType),
         resolve(parent, args) {
            // return authors;
         }
      },
   }
});

// Create add and delete to and from db
const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: { type: GraphQLString },
            age: { type: GraphQLInt }
         },
         resolve(parent, args){
            let author = new Author({
               name: args.name,
               age: args.age
            });

            // monogoDb return it after save on db
            return author.save();
         }
      }
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});