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


const db = {
    users,
    posts,
    comments
}


export {db as default}