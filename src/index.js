import { GraphQLServer } from "graphql-yoga";


// Scalar Types: --- String, Boolean, Int, Float, ID ---

// Demo user data

const comments = [{
    id: "560",
    text: "Hello World!",
    author: "100",
    post: "10"
}, {
    id: "640",
    text: "Wow this course is amazing :D",
    author: "400",
    post: "11"
},{
    id: "520",
    text: "I did not like this course that much :(",
    author: "300",
    post: "12"
},{
    id: "560",
    text: "I would totally recommend this course!",
    author: "400",
    post: "10"
}]

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
        comments: [Comment!]!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    
    type Post {
        id: String!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    
    type Comment {
        id: String!
        text: String!
        author: User!
        post: Post!
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
        comments(parent,args,ctx,info){
            return comments
        }
    },
    Post: {
        author(parent,args,ctx,info) {
            return users.find((user) => user.id === parent.author)
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent,args,ctx,info){
            return posts.filter((post) => Number(post.author) === Number(parent.id))
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment) => Number(comment.author) === Number(parent.id))
        }
    },
    Comment: {
        author(parent,args,ctx,info){
            return users.find((user) => Number(user.id) === Number(parent.author))
        },
        post(parent,args,ctx,info){
            return posts.find((post) => Number(post.id) === Number(parent.post))
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

