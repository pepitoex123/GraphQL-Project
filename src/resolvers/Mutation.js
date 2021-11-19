import uuidv4 from "uuid/v4";

const Mutation = {
    createUser(parent,args,{db},info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)
        if(emailTaken){
            throw new Error(`The email ${args.email} has already been taken`)
        }
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent,args,{db},info){
        const userIndex = db.users.findIndex((user) => {
            return user.id === args.id
        })
        if(userIndex === -1){
            throw new Error("User not found");
        }

        const deletedUsers = db.users.splice(userIndex,1);

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id
            if(match){
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }
            return !match
        })

        db.comments = db.comments.filter((comment) => comment.author !== args.id)


        return deletedUsers[0]
    },
    createPost(parent,args, {db},info){
        const userExists = db.users.some((user) => Number(user.id) === Number(args.data.author))

        if(!userExists){
            throw new Error(`User not found`)
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },
    deletePost(parent,args,{db},info){
        let postIndex = db.posts.findIndex((post) => post.id === args.id);
        if(!postIndex){
            throw new Error(`The post with id ${args.id} does not exist`);
        }
        let deletedPost = db.posts.splice(postIndex,1);
        db.comments = db.comments.filter((comment) => comment.post !== args.id);
        return deletedPost[0];
    },
    createComment(parent,args,{db},info){
        const isUser = db.users.some((user) => Number(user.id) === Number(args.data.author));
        const isPost = db.users.some((user) => Number(user.id) === Number(args.data.post));

        if(!(isUser) || !(isPost)){
            throw new Error("post or/and user not found")
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        return comment;
    },
    deleteComment(parent,args,{db},info){
        let commentIndex = db.comments.findIndex((comment) => comment.id === args.id);
        if(!commentIndex){
            throw new Error(`The comment with id ${args.id} does not exist`);
        }
        let deletedComment = db.comments.splice(commentIndex,1);
        return deletedComment[0];
    }
}

export default Mutation;