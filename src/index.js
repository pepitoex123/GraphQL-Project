import { GraphQLServer } from "graphql-yoga";


// Scalar Types: --- String, Boolean, Int, Float, ID ---

// Demo user data

const users = [{
    id: "1",
    name: "Uriel",
    email: "Uriel@example.com",
    age: 4000
},{
    id: "2",
    name: "Monica",
    email: "Monica@example.com"
},{
    id: "3",
    name: "Sarah",
    email: "Sarah@example.com"
}]

// Type Definitions (application schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
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
        users(parent,args,ctx,info){
            if(!args.query){
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
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

