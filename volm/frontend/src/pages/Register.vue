<template>
    <q-page class="flex flex-center">
        <div class="column items-start">
            <q-form @submit="register()">
                <q-input
                    v-model="first_name"
                    class="q-pb-md"
                    label="First name *"
                    outlined
                />
                <q-input
                    v-model="last_name"
                    class="q-pb-md"
                    label="Last name *"
                    outlined
                />
                <q-input
                    v-model="email"
                    class="q-pb-md"
                    label="Email *"
                    outlined
                />
                <q-input
                    v-model="password_1"
                    class="q-pb-md"
                    label="Password *"
                    type="password"
                    outlined
                />
                <q-input
                    v-model="password_2"
                    class="q-pb-md"
                    label="Confirm password *"
                    type="password"
                    outlined
                />

                <q-btn
                    color="primary"
                    label="Register"
                    type="submit"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { registerApi } from 'src/api/auth.js'

export default {
    name: 'RegisterPage',
    data () {
        return {
            email: '',
            first_name: '',
            last_name: '',
            password_1: '',
            password_2: '',
        }
    },
    methods: {
        register () {
            registerApi({
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                password_1: this.password_1,
                password_2: this.password_2,
            })
        },
    },
}
</script>
