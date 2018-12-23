const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
const books = [
  { name: 'Book 1', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'Book 2', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'Book 3', genre: 'Fantasy', id: '3', authorId: '3' },
  { name: 'Book 4', genre: 'Fantasy', id: '4', authorId: '1' },
  { name: 'Book 5', genre: 'Fantasy', id: '5', authorId: '2' },
  { name: 'Book 6', genre: 'Fantasy', id: '6', authorId: '3' }
];

const authors = [
  { name: 'Author 1', age: 23, id: '1' },
  { name: 'Author 2', age: 33, id: '2' },
  { name: 'Author 3', age: 43, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This is an example description for a book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: {
      type: GraphQLString,
      description: 'This is the description of the genre'
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This is an author type. It holds author information',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
        // code to get data from db / other source
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
