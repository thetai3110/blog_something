import { CommentTypes } from "./comment.types"

const INITIAL_STATE = {
    lstComments: [],
    hiddenEmoji: true
}

export const commentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommentTypes.SET_LST_COMMENTS: {
            return { ...state, lstComments: action.payload }
        }
        case CommentTypes.HIDDEN_EMOJI: {
            return { ...state, hiddenEmoji: !state.hiddenEmoji }
        }
        default:
            return state;
    }
}