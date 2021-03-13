export const UserService = {
    find: function () {
        return fetch(`${process.env.REACT_APP_SERVER}/user`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    findByUsername: function (username) {
        return fetch(`${process.env.REACT_APP_SERVER}/user/${username}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    },
    create: function (data) {
        return fetch(`${process.env.REACT_APP_SERVER}/user/create`, {
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
        return fetch(`${process.env.REACT_APP_SERVER}/user/modify/${id}`, {
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
        return fetch(`${process.env.REACT_APP_SERVER}/user/delete/${id}`)
            .then(res => res.json())
            .then(data => { return data })
            .catch(err => { return { msg: `fetch failed because: ${err}` } })
    }
}