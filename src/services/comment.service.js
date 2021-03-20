import app from "../firebase";

export const CommentService = {
    newComment: function (user, content, avatar, key) {
        app.database().ref(`Blogs/${key}/comments`).push({
            user,
            content,
            avatar
        })
    },
    newFeedback: function (keyParent, keyChild, user, content, avatar) {
        app.database().ref(`Blogs/${keyParent}/comments/${keyChild}/feedback`).push({
            user,
            content,
            avatar
        })
    }
}