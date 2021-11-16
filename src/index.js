import { GraphQLServer } from "graphql-yoga";


// Scalar Types: --- String, Boolean, Int, Float, ID ---




// Type Definitions (application schema)

const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    
    type Post {
        id: String!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers

const resolvers = {
    Query: {
        me() {
            return {
                id: "123098",
                name: "Pep",
                email: "mike@example.com",
                age: 32
            }
        },
        post() {
            return {
                id: "121311a",
                title: "How to improve your cooking skills",
                body: "Bla bla bla",
                published: true
            }
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("The server is up!");
})

console.log("Hello GraphQL")

