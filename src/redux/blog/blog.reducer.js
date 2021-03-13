import { BlogTypes } from "./blog.types"

const INITIAL_STATE = {
    // Load blog
    lstBlogs: [],
    countBlogs: 0,
    tagsBlog: [],
    // Create blog
    tagsCreating: [],
    blogInfo: {
        title: '',
        summary: '',
        content: '',
        image: ''
    },
    fileName: '',
    hiddenSave: true
}

export const blogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BlogTypes.SET_LST_BLOGS: {
            return { ...state, lstBlogs: action.payload }
        }
        case BlogTypes.SET_COUNT_BLOGS: {
            return { ...state, countBlogs: action.payload }
        }
        case BlogTypes.SET_TAGS_BLOG: {
            return { ...state, tagsBlog: action.payload }
        }
        case BlogTypes.SET_TAGS_CREATING: {
            return { ...state, tagsCreating: action.payload }
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
        default:
            return state;
    }
}