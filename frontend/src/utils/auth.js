export const BASE_URL = 'http://api.mesto.soffeine.nomoredomains.rocks';

const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(getResponseData)
        .then(({data}) => {
            console.log(data)
            localStorage.setItem('email', data.email);
        });
};


export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    })
        .then(getResponseData)
        .then((data) => {
            localStorage.setItem('jwt', data.token);
        })

}

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(getResponseData)
        .then(data => data)
}