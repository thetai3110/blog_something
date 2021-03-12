import { combineReducers } from "redux";
import { blogReducer } from "./blog/blog.reducer";
import { commentReducer } from "./comment/comment.reducer";

export const rootReducer = combineReducers({
    blog: blogReducer,
    comment: commentReducer
})