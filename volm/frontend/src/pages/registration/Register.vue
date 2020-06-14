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
                    :error="!!errors.first_name"
                    :error-message="errors.first_name"
                />
                <q-input
                    v-model="last_name"
                    class="test-lastName q-pb-xl"
                    label="Last name *"
                    outlined
                    :error="!!errors.last_name"
                    :error-message="errors.last_name"
                />
                <q-input
                    v-model="email"
                    class="test-email q-pb-xl"
                    label="Email *"
                    outlined
                    :error="!!errors.email"
                    :error-message="errors.email"
                />
                <q-input
                    v-model="password_1"
                    class="test-password_1 q-pb-xl"
                    label="Password *"
                    type="password"
                    outlined
                    :error="!!errors.password"
                    :error-message="errors.password"
                />
                <q-input
                    v-model="password_2"
                    class="test-password_2 q-pb-xl"
                    label="Confirm password *"
                    type="password"
                    outlined
                    :error="!!errors.password"
                    :error-message="errors.password"
                />

                <q-btn
                    id="test-submit"
                    color="primary"
                    label="Register"
                    type="submit"
                    :loading="isLoading"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { registerApi } from 'src/api/auth.js'
import constants from 'src/constants.js'

export default {
    name: 'RegisterPage',
    data () {
        return {
            errors: {},
            email: '',
            first_name: '',
            isLoading: false,
            last_name: '',
            password_1: '',
            password_2: '',
        }
    },
    methods: {
        getErrorMessage (DJANGO_ERROR) {
            const OBJ = {
                [constants.django.errors.blank]: this.$t('pages.register.errors.blank'),
                [constants.django.errors.max_30_char]: this.$t('pages.register.errors.max_30_char'),
                [constants.django.errors.max_128_char]: this.$t('pages.register.errors.max_128_char'),
                [constants.django.errors.max_150_char]: this.$t('pages.register.errors.max_150_char'),
                [constants.django.errors.invalid_email]: this.$t('pages.register.errors.invalid_email'),
                [constants.django.errors.password_mismatch]: this.$t('pages.register.errors.password_mismatch'),
                [constants.django.errors.password_min_8_char]: this.$t('pages.register.errors.password_min_8_char'),
                [constants.django.errors.password_too_common]: this.$t('pages.register.errors.password_too_common'),
                [constants.django.errors.password_entirely_numeric]: this.$t('pages.register.errors.password_entirely_numeric'),
                [constants.django.errors.username_already_exists]: this.$t('pages.register.errors.email_already_exists'),
            }

            return OBJ[DJANGO_ERROR]
        },
        register () {
            this.errors = {}
            this.isLoading = true
            registerApi({
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                password_1: this.password_1,
                password_2: this.password_2,
            })
                .then(() => {
                    this.$router.push({ name: 'confirm_email' })
                })
                .catch(ERROR => {
                    console.error('registerApi()', ERROR)
                    this.setErrors(ERROR.body)
                })
                .finally(() => { this.isLoading = false })
        },
        setErrors (ERRORS) {
            Object.entries(ERRORS).forEach(
                ([KEY, VALUE]) => {
                    const ERROR_MESSAGES = VALUE
                    const UPDATED_KEY = KEY === 'username' ? 'email' : KEY
                    ERROR_MESSAGES.forEach(ERROR => {
                        let error = ''
                        if (this.errors[UPDATED_KEY]) error = `${this.errors[UPDATED_KEY]}. ${this.getErrorMessage(ERROR)}`
                        else error = `${this.getErrorMessage(ERROR)}`
                        this.$set(this.errors, UPDATED_KEY, error)
                    })
                },
            )
        },
    },
}
</script>
