<template>
    <q-page class="flex flex-center">
        <div class="column items-start">
            <section>
                <header>
                    <h1 class="text-h2 q-mb-none">
                        Register
                    </h1>
                </header>
                <q-form
                    class="q-mt-xl"
                    :style="!$q.screen.lt.sm ? 'min-width:400px;' : 'min-width:90vw;'"
                    @submit="register()"
                >
                    <span date-test="firstName">
                        <q-input
                            v-model="first_name"
                            class="q-pb-xl"
                            for="test-first_name"
                            id="test-first_name"
                            label="First name *"
                            outlined
                            :error="!!errors.first_name"
                            :error-message="errors.first_name"
                        />
                    </span>
                    <span data-test="lastName">
                        <q-input
                            v-model="last_name"
                            class="q-pb-xl"
                            for="test-last_name"
                            id="test-last_name"
                            label="Last name *"
                            outlined
                            :error="!!errors.last_name"
                            :error-message="errors.last_name"
                        />
                    </span>
                    <span data-test="email">
                        <q-input
                            v-model="email"
                            class="q-pb-xl"
                            for="test-email"
                            id="test-email"
                            label="Email *"
                            outlined
                            :error="!!errors.email"
                            :error-message="errors.email"
                        />
                    </span>
                    <span data-test="password_1">
                        <q-input
                            v-model="password_1"
                            class="q-pb-xl"
                            for="test-password_1"
                            id="test-password_1"
                            label="Password *"
                            type="password"
                            outlined
                            :error="!!errors.password"
                            :error-message="errors.password"
                        />
                    </span>
                    <span data-test="password_2">
                        <q-input
                            v-model="password_2"
                            class="q-pb-xl"
                            for="test-password_2"
                            id="test-password_2"
                            label="Confirm password *"
                            type="password"
                            outlined
                            :error="!!errors.password"
                            :error-message="errors.password"
                        />
                    </span>

                    <q-btn
                        color="primary"
                        data-test="submit"
                        label="Submit"
                        type="submit"
                        :loading="isLoading"
                    />
                </q-form>

                <div class="q-my-lg">
                    Already have an account?
                    <router-link
                        date-test="log-in"
                        :to="{ name: 'login' }"
                    >
                        Log-in
                    </router-link>
                </div>
            </section>
        </div>
    </q-page>
</template>

<script>
import { registerApi } from 'src/api/auth.js'
import constants from 'src/constants.js'

export default {
    name: 'RegistrationPage',
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
                default: this.$t('pages.register.errors.field_contains_errors'),
            }

            return (OBJ[DJANGO_ERROR] || OBJ.default)
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
