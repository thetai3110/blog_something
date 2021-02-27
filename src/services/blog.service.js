import { CommonConstants } from "../common/constants"

export const BlogService = {
    find: function () {
        return fetch(`${CommonConstants.server}/blog`);
    },
    findById: function (id) {
        return fetch(`${CommonConstants.server}/blog/${id}`);
    },
    findByPublished: function (published) {
        return fetch(`${CommonConstants.server}/blog/published/${published}`);
    },
    findByPage: function (page) {
        return fetch(`${CommonConstants.server}/blog/page/${page}`);
    },
    total: function () {
        return fetch(`${CommonConstants.server}/blog/total`);
    },
    create: function (data) {
        return fetch(`${CommonConstants.server}/blog/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        });
    },
    modify: function (id, data) {
        return fetch(`${CommonConstants.server}/blog/modify/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        });
    },
    delete: function (id) {
        return fetch(`${CommonConstants.server}/blog/delete/${id}`);
    }
}