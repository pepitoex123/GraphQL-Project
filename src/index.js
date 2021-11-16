import { GraphQLServer } from "graphql-yoga";


// Scalar Types: --- String, Boolean, Int, Float, ID ---




// Type Definitions (application schema)

const typeDefs = `
    type Query {
        greeting(name: String,position: String): String!
        me: User!
        post: Post!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
        greeting(parent,args,ctx,info){
            if(args.name && args.position){
                return `Hello, ${args.name}! You are my favorite ${args.position}`
            }else{
                return "Hello!"
            }
        },
        add(parent,args,ctx,info){
            return args.numbers.reduce((acc,number) => {
                return acc += number
            },0)
        },
        grades(parent,args,ctx,info) {
            return [99,80,93]
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

