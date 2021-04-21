import { BlogTypes } from "./blog.types";

export const setLstBlogs = blogs => ({
    type: BlogTypes.SET_LST_BLOGS,
    payload: blogs
})

export const setLstDrafts = drafts => ({
    type: BlogTypes.SET_LST_DRAFTS,
    payload: drafts
})

export const setLstPublics = publics => ({
    type: BlogTypes.SET_LST_PUBLICS,
    payload: publics
})

export const setLstPrivates = privates => ({
    type: BlogTypes.SET_LST_PRIVATES,
    payload: privates
})

export const setCountBlogs = count => ({
    type: BlogTypes.SET_COUNT_BLOGS,
    payload: count
})

export const setCountDrafts = count => ({
    type: BlogTypes.SET_COUNT_DRAFTS,
    payload: count
})

export const setCountPublics = count => ({
    type: BlogTypes.SET_COUNT_PUBLICS,
    payload: count
})

export const setCountPrivates = count => ({
    type: BlogTypes.SET_COUNT_PRIVATES,
    payload: count
})

export const setTagsBlog = tags => ({
    type: BlogTypes.SET_TAGS_BLOG,
    payload: tags
})

export const setBlogInfo = blogInfo => ({
    type: BlogTypes.SET_BLOG_INFO,
    payload: blogInfo
})

export const setFilename = name => ({
    type: BlogTypes.SET_FILENAME,
    payload: name
})

export const toggleSaveBox = () => ({
    type: BlogTypes.TOGGLE_SAVE_BOX
})

export const setProgressUpload = (progress) => ({
    type: BlogTypes.PROGRESS_UPLOAD,
    payload: progress
})

export const setHiddenProgressUpload = (status) => ({
    type: BlogTypes.HIDDEN_PROGRESS,
    payload: status
})

export const setHiddenSidebar = (hidden) => ({
    type: BlogTypes.HIDDEN_SIDEBAR,
    payload: hidden
})

export const setAllTags = (tags) => ({
    type: BlogTypes.SET_ALL_TAG,
    payload: tags
})

export const setSearchInfo = (info) => ({
    type: BlogTypes.SEARCH_INFO,
    payload: info
})

export const setSelectionRange = (selectionRange) => ({
    type: BlogTypes.SET_SELECTION_RANGE,
    payload: selectionRange
})