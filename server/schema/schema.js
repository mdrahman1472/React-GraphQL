const graphql = require('graphql');

const {
   GraphQLSchema,
   GraphQLObjectType,
   GraphQLString
} = graphql;

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({ // having function instead of just object beacuse it will have reference error when we add some other thing that is defined in other place and not defined before this has called
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString }
   })
});

// define root query which will defines number of ways the queries will be done
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: { // doesn't matter with order so do not need function
      type: BookType,
      args: {
         id: { type: GraphQLString }
      },
      resolve: (parent, args) => ({

      })
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery
});