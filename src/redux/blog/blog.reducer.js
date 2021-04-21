import { BlogTypes } from "./blog.types"

const INITIAL_STATE = {
    // blog page
    lstBlogs: [],
    countBlogs: 0,
    tagsBlog: [],
    // draft
    lstDrafts: [],
    lstPublics: [],
    lstPrivates: [],
    // blog creating
    blogInfo: {
        title: '',
        summary: '',
        content: '',
        image: '',
        tags: []
    },
    fileName: '',
    // Save
    hiddenSave: true,
    // Progress upload
    progress: 0,
    hidenProgress: true
}

export const blogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BlogTypes.SET_LST_BLOGS: {
            return { ...state, lstBlogs: action.payload }
        }
        case BlogTypes.SET_LST_DRAFTS: {
            return { ...state, lstDrafts: action.payload }
        }
        case BlogTypes.SET_LST_PUBLICS: {
            return { ...state, lstPublics: action.payload }
        }
        case BlogTypes.SET_LST_PRIVATES: {
            return { ...state, lstPrivates: action.payload }
        }
        case BlogTypes.SET_COUNT_BLOGS: {
            return { ...state, countBlogs: action.payload }
        }
        case BlogTypes.SET_TAGS_BLOG: {
            return { ...state, tagsBlog: action.payload }
        }
        case BlogTypes.SET_BLOG_INFO: {
            return { ...state, blogInfo: action.payload }
        }
        case BlogTypes.SET_FILENAME: {
            return { ...state, fileName: action.payload }
        }
        case BlogTypes.TOGGLE_SAVE_BOX: {
            return { ...state, hiddenSave: !state.hiddenSave }
        }
        case BlogTypes.PROGRESS_UPLOAD: {
            return { ...state, progress: action.payload }
        }
        case BlogTypes.HIDDEN_PROGRESS: {
            return { ...state, hiddenProgress: action.payload }
        }
        default:
            return state;
    }
}