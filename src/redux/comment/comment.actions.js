import { CommentTypes } from "./comment.types";

export const setLstComments = comments => ({
    type: CommentTypes.SET_LST_COMMENTS,
    payload: comments
})