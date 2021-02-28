import app from "../firebase";

export const CommentService = {
    newComment: function (id, user, content, avatar) {
        app.database().ref('Comments').push({
            id,
            user,
            content,
            avatar
        })
    },
    newFeedback: function (key, user, content, avatar) {
        app.database().ref(`Comments/${key}/feedback`).push({
            user,
            content,
            avatar
        })
    }
}