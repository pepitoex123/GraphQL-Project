import { GraphQLServer } from "graphql-yoga";


// Scalar Types: --- String, Boolean, Int, Float, ID ---




// Type Definitions (application schema)

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers

const resolvers = {
    Query: {
        title() {
            return "Product 1"
        },
        price() {
            return 3.14
        },
        releaseYear() {
            return 2014
        },
        rating() {
            return null
        },
        inStock() {
            return true
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

