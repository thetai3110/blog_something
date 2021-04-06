import { combineReducers } from "redux";
import { blogReducer } from "./blog/blog.reducer";
import { commentReducer } from "./comment/comment.reducer";
import { commonReducer } from "./common/common.reducer";
import { loginReducer } from "./login/login.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    blog: blogReducer,
    comment: commentReducer,
    login: loginReducer,
    user: userReducer,
    common: commonReducer
})