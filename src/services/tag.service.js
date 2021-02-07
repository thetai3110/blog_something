import { CommonConstants } from "../common/constants"

export const TagsService = {
    find: function () {
        return fetch(`${CommonConstants.server}/tag`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return null })
    },
    findById: function (id) {
        fetch(`${CommonConstants.server}/tag/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return null })
    },
    create: function (data) {
        return fetch(`${CommonConstants.server}/tag/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
    }
}