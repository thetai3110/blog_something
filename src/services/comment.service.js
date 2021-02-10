import { CommonConstants } from "../common/constants"

export const CommentService = {
    find: function () {
        return fetch(`${CommonConstants.server}/comment`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    findById: function (id) {
        return fetch(`${CommonConstants.server}/comment/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    create: function (data) {
        return fetch(`${CommonConstants.server}/comment/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    modify: function (id, data) {
        return fetch(`${CommonConstants.server}/comment/modify/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    delete: function (id) {
        return fetch(`${CommonConstants.server}/comment/delete/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    }
}