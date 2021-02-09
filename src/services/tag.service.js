import { CommonConstants } from "../common/constants"

export const TagsService = {
    find: function () {
        return fetch(`${CommonConstants.server}/tag`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    findById: function (id) {
        return fetch(`${CommonConstants.server}/tag/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    create: function (data) {
        return fetch(`${CommonConstants.server}/blog/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    }
}