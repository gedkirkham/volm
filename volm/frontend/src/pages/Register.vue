<template>
    <q-page class="flex flex-center">
        <div class="column items-start">
            <q-form
                style="min-width:400px;"
                @submit="register()"
            >
                <q-input
                    v-model="first_name"
                    class="test-firstName q-pb-xl"
                    label="First name *"
                    outlined
                    :error="is_first_name_error"
                    :error-message="first_name_error_message"
                />
                <q-input
                    v-model="last_name"
                    class="test-lastName q-pb-xl"
                    label="Last name *"
                    outlined
                />
                <q-input
                    v-model="email"
                    class="test-email q-pb-xl"
                    label="Email *"
                    outlined
                />
                <q-input
                    v-model="password_1"
                    class="test-password_1 q-pb-xl"
                    label="Password *"
                    type="password"
                    outlined
                />
                <q-input
                    v-model="password_2"
                    class="test-password_2 q-pb-xl"
                    label="Confirm password *"
                    type="password"
                    outlined
                />

                <q-btn
                    id="test-submit"
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
            errors: {},
            email: '',
            first_name: '',
            last_name: '',
            password_1: '',
            password_2: '',
        }
    },
    computed: {
        is_first_name_error () {
            return !!this.first_name_error_message
        },
        first_name_error_message () {
            const ERROR_KEY = 'first_name'
            return this.errors[ERROR_KEY] ? this.errors[ERROR_KEY] : ''
        },
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
                .catch(ERROR => {
                    console.error('registerApi()', ERROR)
                    Object.entries(ERROR.body).forEach(
                        ([KEY, VALUE]) => this.$set(this.errors, KEY, VALUE[0]),
                    )
                })
        },
    },
}
</script>
