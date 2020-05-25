import Vue from 'vue'

function refreshToken () {
    return Vue
        .http
        .post(process.env.API + '/token/refresh/', { refresh: localStorage.getItem('refresh') || null })
        .then(RESP => localStorage.setItem('access', RESP.body.access))
}

Vue.http.interceptors.push(request => {
    let hasRefreshedToken = false

    if (request.url.includes('/api/token/refresh/')) hasRefreshedToken = true
    else request.headers.set('Authorization', `Bearer ${localStorage.getItem('access') || null}`)
    request.headers.set('Accept', 'application/json')

    return function (response) {
        if (response.status === 401 && !hasRefreshedToken) {
            return Promise
                .resolve(refreshToken()
                    .then(_ => Vue.http(request)))
        }
    }
})
