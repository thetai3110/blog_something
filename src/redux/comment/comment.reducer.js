import { CommentTypes } from "./comment.types"

const INITIAL_STATE = {
    lstComments: []
}

export const commentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommentTypes.SET_LST_COMMENTS: {
            return { ...state, lstComments: action.payload }
        }
        default:
            return state;
    }
}