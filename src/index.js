import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";


// Scalar Types: --- String, Boolean, Int, Float, ID ---

// Demo user data

let comments = [{
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

let users = [{
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


let posts = [{
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
    
    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
        deleteUser(id: ID!): User!
        deletePost(id: ID!): Post!
    }
    
    
    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }
    
    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }
    
    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
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
    Mutation: {
        createUser(parent,args,ctx,info) {
            const emailTaken = users.some((user) => user.email === args.data.email)
            if(emailTaken){
                throw new Error(`The email ${args.email} has already been taken`)
            }
            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)

            return user
        },
        deleteUser(parent,args,ctx,info){
            const userIndex = users.findIndex((user) => {
                return user.id === args.id
            })
            if(userIndex === -1){
                throw new Error("User not found");
            }

            const deletedUsers = users.splice(userIndex,1);

            posts = posts.filter((post) => {
                const match = post.author === args.id
                if(match){
                    comments = comments.filter((comment) => {
                        return comment.post !== post.id
                    })
                }
                return !match
            })

            comments = comments.filter((comment) => comment.author !== args.id)


            return deletedUsers[0]
        },
        createPost(parent,args,ctx,info){
            const userExists = users.some((user) => Number(user.id) === Number(args.data.author))

            if(!userExists){
                throw new Error(`User not found`)
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post
        },
        deletePost(parent,args,ctx,info){
            let postIndex = posts.findIndex((post) => post.id === args.id);
            if(!postIndex){
                throw new Error(`The post with id ${args.id} does not exist`);
            }
            let deletedPost = posts.splice(postIndex,1);
            comments = comments.filter((comment) => comment.post !== args.id);
            return deletedPost[0];
        },
        createComment(parent,args,ctx,info){
            const isUser = users.some((user) => Number(user.id) === Number(args.data.author));
            const isPost = users.some((user) => Number(user.id) === Number(args.data.post));

            if(!(isUser) || !(isPost)){
                throw new Error("post or/and user not found")
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment;
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

