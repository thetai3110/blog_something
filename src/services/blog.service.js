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
        const { author, title, summary, content, image, tags, published, comments } = data;
        app.database().ref('Blogs').push({ author, title, summary, content, image, tags, published, comments })
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