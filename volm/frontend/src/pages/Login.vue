<template>
    <q-page class="flex flex-center">
        <q-form @submit="login()">
            <q-input
                v-model="username"
                label="Username"
            />
            <q-input
                v-model="password"
                label="Password"
                type="password"
            />
            <q-btn
                label="Login"
                type="submit"
            />
        </q-form>
    </q-page>
</template>

<script>
export default {
    name: 'LoginPage',
    data () {
        return {
            password: '',
            username: '',
        }
    },
    methods: {
        login () {
            this
                .$http
                .post(process.env.API + '/token/', {
                    username: '',
                    password: '',
                })
                .then(RESP => {
                    const TOKENS = RESP.body
                    localStorage.setItem('access', TOKENS.access)
                    localStorage.setItem('refresh', TOKENS.refresh)
                })
                .catch(ERROR => console.error('login()', ERROR))
        },
    },
}
</script>
