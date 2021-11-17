import { GraphQLServer } from "graphql-yoga";


// Scalar Types: --- String, Boolean, Int, Float, ID ---

// Demo user data

const users = [{
    id: "100",
    name: "Uriel",
    email: "Uriel@example.com",
    age: 4000
},{
    id: "400",
    name: "Monica",
    email: "Monica@example.com"
},{
    id: "300",
    name: "Sarah",
    email: "Sarah@example.com"
}]


const posts = [{
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "100"
},{
    id: "11",
    title: "GraphQL 201",
    body: "This is an advanced GraphQL course",
    published: false,
    author: "100"
},{
    id: "12",
    title: "GraphQL 301",
    body: "This is a super advanced GraphQL course",
    published: false,
    author: "300"
},
]

// Type Definitions (application schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }
    
    type Post {
        id: String!
        title: String!
        body: String!
        published: Boolean!
        author: User!
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
        posts(parent,args,ctx,info){
            if(!args.query){
                return posts
            }
            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase());
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
    },
    Post: {
        author(parent,args,ctx,info) {
            return users.find((user) => user.id === parent.author)
        }
    },
    User: {
        posts(parent,args,ctx,info){
            return posts.filter((post) => Number(post.author) === Number(parent.id))
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

