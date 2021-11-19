const Comment = {
    author(parent,args,{db},info){
        return db.users.find((user) => Number(user.id) === Number(parent.author))
    },
    post(parent,args,{db},info){
        return db.posts.find((post) => Number(post.id) === Number(parent.post))
    }
}


export default Comment;