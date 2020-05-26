<template>
    <q-page class="flex flex-center">
        <div class="column items-start">
            <q-form @submit="login()">
                <q-input
                    v-model="email"
                    class="q-pb-md"
                    label="Email"
                    outlined
                />
                <q-input
                    v-model="password"
                    class="q-pb-md"
                    label="Password"
                    type="password"
                    outlined
                />

                <q-btn
                    color="primary"
                    label="Login"
                    type="submit"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { loginApi } from 'src/api/auth.js'

export default {
    name: 'LoginPage',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login () {
            loginApi({ email: this.email, password: this.password })
        },
    },
}
</script>
