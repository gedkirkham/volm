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

export function registerApi (OBJ) {
    Vue
        .http
        .post(process.env.API + '/register/', {
            email: OBJ.email,
            first_name: OBJ.first_name,
            last_name: OBJ.last_name,
            password: OBJ.password_1,
            password_2: OBJ.password_2,
            username: OBJ.email,
        })
        .catch(ERROR => console.error('registerApi()', ERROR))
}
