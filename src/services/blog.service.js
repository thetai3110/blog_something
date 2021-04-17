import app from "../firebase";

export const BlogService = {
    // find: function () {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog`);
    // },
    // findById: function (id) {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog/${id}`);
    // },
    // findByPublished: function (published) {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog/published/${published}`);
    // },
    // findByPage: function (page) {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog/page/${page}`);
    // },
    // total: function () {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog/total`);
    // },
    create: function (data) {
        const { author, title, summary, content, image, tags, published, lastModify, comments } = data;
        app.database().ref('Blogs').push({ author, title, summary, content, image, tags, published, lastModify, comments })
    },
    modify: function (data, id) {
        const { title, summary, content, image, tags, published, lastModify } = data;
        const updates = {};
        updates[`Blogs/${id}/title`] = title;
        updates[`Blogs/${id}/summary`] = summary;
        updates[`Blogs/${id}/content`] = content;
        updates[`Blogs/${id}/image`] = image;
        updates[`Blogs/${id}/tags`] = tags;
        updates[`Blogs/${id}/published`] = published;
        updates[`Blogs/${id}/lastModify`] = lastModify;
        app.database().ref().update(updates);
    },
    remove: function (id) {
        app.database().ref(`Blogs/${id}`).remove();
    },
    // modify: function (id, data) {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog/modify/${id}`, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         }),
    //     });
    // },
    // delete: function (id) {
    //     return fetch(`${process.env.REACT_APP_SERVER}/blog/delete/${id}`);
    // }
}