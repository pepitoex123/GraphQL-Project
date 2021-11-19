const User = {
    posts(parent,args, {db},info){
        return db.posts.filter((post) => Number(post.author) === Number(parent.id))
    },
    comments(parent,args, {db},info){
        return db.comments.filter((comment) => Number(comment.author) === Number(parent.id))
    }
}


export default User;