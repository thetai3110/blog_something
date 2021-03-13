export const TagsService = {
    find: function () {
        return fetch(`${process.env.REACT_APP_SERVER}/tag`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    findById: function (id) {
        return fetch(`${process.env.REACT_APP_SERVER}/tag/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    create: function (data) {
        return fetch(`${process.env.REACT_APP_SERVER}/tag/create`, {
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
        return fetch(`${process.env.REACT_APP_SERVER}/tag/modify/${id}`, {
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
        return fetch(`${process.env.REACT_APP_SERVER}/tag/delete/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    }
}