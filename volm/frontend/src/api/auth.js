import Vue from 'vue'

export function loginApi (OBJ) {
    Vue
        .http
        .post(process.env.API + '/token/', {
            username: OBJ.email,
            password: OBJ.password,
        })
        .then(RESP => {
            const TOKENS = RESP.body
            localStorage.setItem('access', TOKENS.access)
            localStorage.setItem('refresh', TOKENS.refresh)
        })
        .catch(ERROR => console.error('login()', ERROR))
}

let registerApiPromise
let registerApiLoading = false
export function registerApi (OBJ) {
    if (registerApiLoading) return registerApiPromise

    registerApiLoading = true
    registerApiPromise = Vue
        .http
        .post(process.env.API + '/register/', {
            email: OBJ.email,
            first_name: OBJ.first_name,
            last_name: OBJ.last_name,
            password: OBJ.password,
            username: OBJ.email,
        })
        .finally(() => { registerApiLoading = false })

    return registerApiPromise
}
