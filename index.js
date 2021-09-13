const { ApolloServer, gql, UserInputError } = require('apollo-server');

const typeDefs = gql`
type Todo {
    id: ID!
    text: String!
    complete: Boolean!
}

type Query {
    todos: [Todo]
}

input TodoInput {
    text: String!
    complete: Boolean
}

type Mutation {
    addTodo(input: TodoInput!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
}
`;

let i = 0;
const id = () => {
    i++;
    return String(i);
};

const todos = [
    {
        id: id(),
        text: 'one',
        complete: true,
    },
    {
        id: id(),
        text: 'two',
        complete: false,
    },
];

const resolvers = {
    Query: {
        todos: () => todos,
    },
    Mutation: {
        addTodo: (_, { input }) => {
            const newTodo = { id: id(), complete: false, ...input };
            todos.push(newTodo);
            return newTodo;
        },
        updateTodo: (_, { id, input }) => {
            const index = todos.findIndex(x => x.id === id);
            const todo = todos[index];
            if (!todo) {
                throw new UserInputError(`Could not find todo with id: ${id}`);
            }
            const updatedTodo = { ...todo, ...input };
            todos.splice(index, 1, updatedTodo);
            return updatedTodo;
        },
    },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
