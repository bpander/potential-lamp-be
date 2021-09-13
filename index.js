const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Todo {
    text: String
    complete: Boolean!
}

type Query {
    todos: [Todo]
}
`;

const todos = [
    {
      text: 'one',
      complete: true,
    },
    {
      text: 'two',
      complete: false,
    },
];

const resolvers = {
    Query: {
        todos: () => todos,
    },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
