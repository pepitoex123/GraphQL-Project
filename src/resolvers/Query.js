

const Query = {
    users(parent,args,{db},info){
        if(!args.query){
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        })
    },
    posts(parent,args,{db},info){
        if(!args.query){
            return db.posts
        }
        return db.posts.filter((post) => {
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
    comments(parent,args, {db},info){
        return db.comments
    }
}


export default Query;