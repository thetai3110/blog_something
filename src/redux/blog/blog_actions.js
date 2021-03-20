import { BlogTypes } from "./blog.types";

export const setLstBlogs = blogs => ({
    type: BlogTypes.SET_LST_BLOGS,
    payload: blogs
})

export const setCountBlogs = count => ({
    type: BlogTypes.SET_COUNT_BLOGS,
    payload: count
})

export const setTagsBlog = tags => ({
    type: BlogTypes.SET_TAGS_BLOG,
    payload: tags
})

export const setTagsCreating = tags => ({
    type: BlogTypes.SET_TAGS_CREATING,
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