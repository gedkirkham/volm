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

        <q-btn
            label="Get User"
            @click="getUser()"
        />

        <q-btn
            label="Logout"
            @click="logout()"
        />
    </q-page>
</template>

<script>
export default {
    name: 'PageIndex',
    data () {
        return {
            password: 'tet20051702',
            username: 'kirk4231',
        }
    },
    methods: {
        getUser () {
            console.log(localStorage.getItem('access') || null)
            this
                .$http
                .get(process.env.API + '/user/')
                .catch(ERROR => console.error('login()', ERROR))
        },
        login () {
            this
                .$http
                .post(process.env.API + '/token/', {
                    username: 'tet20051702',
                    password: 'kirk4231',
                })
                .then(RESP => {
                    const TOKENS = RESP.body
                    localStorage.setItem('access', TOKENS.access)
                    localStorage.setItem('refresh', TOKENS.refresh)
                })
                .catch(ERROR => console.error('login()', ERROR))
            console.log(localStorage)
        },
        logout () {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        },
    },
}
</script>
