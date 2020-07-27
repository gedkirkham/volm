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
                    <span data-test="firstName">
                        <q-input
                            id="test-first_name"
                            v-model="form.first_name"
                            class="q-pb-xl"
                            for="test-first_name"
                            label="First name"
                            maxlength="30"
                            autofocus
                            outlined
                        />
                    </span>
                    <span data-test="lastName">
                        <q-input
                            id="test-last_name"
                            v-model="form.last_name"
                            class="q-pb-xl"
                            for="test-last_name"
                            label="Last name"
                            maxlength="150"
                            outlined
                        />
                    </span>
                    <span data-test="email">
                        <q-input
                            id="test-email"
                            v-model="form.email"
                            class="q-pb-xl"
                            for="test-email"
                            label="Email *"
                            lazy-rules="ondemand"
                            maxlength="150"
                            type="email"
                            outlined
                            required
                            :error="!!errors.email"
                            :error-message="errors.email"
                        />
                    </span>
                    <span data-test="password">
                        <q-input
                            id="test-password"
                            v-model="form.password"
                            autocomplete="new-password"
                            class="q-pb-xl"
                            for="test-password"
                            hint="Min 8 characters. Must contain at least one non-numeric character"
                            label="Password *"
                            lazy-rules="ondemand"
                            maxlength="128"
                            minlength="8"
                            name="new-password"
                            outlined
                            required
                            :error="!!errors.password"
                            :error-message="errors.password"
                            :rules="[VALUE => validateInput({ TYPE: 'password', VALUE: VALUE })]"
                            :type="togglePassword ? 'password' : 'text'"
                        >
                            <template v-slot:append>
                                <q-icon
                                    aria-label="Show password as plain text. Warning: this will display your password on the screen."
                                    class="cursor-pointer"
                                    :name="togglePassword ? 'visibility_off' : 'visibility'"
                                    @click="togglePassword = !togglePassword"
                                />
                            </template>
                        </q-input>
                    </span>

                    <q-btn
                        color="primary"
                        data-test="submit"
                        label="Register"
                        type="submit"
                        :loading="isLoading"
                    />
                </q-form>

                <div class="q-my-lg">
                    Already have an account?
                    <router-link
                        data-test="log-in"
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
            form: {
                email: '',
                first_name: '',
                last_name: '',
                password: '',
            },
            isLoading: false,
            isFocused: true,
            togglePassword: true,
        }
    },
    methods: {
        getErrorMessage (DJANGO_ERROR) {
            /**
             * transform django errors to app specific error messages
             */
            const OBJ = {
                [constants.django.errors.blank]: this.$t('pages.register.errors.blank'),
                [constants.django.errors.max_30_char]: this.$t('pages.register.errors.max_30_char'),
                [constants.django.errors.max_128_char]: this.$t('pages.register.errors.max_128_char'),
                [constants.django.errors.max_150_char]: this.$t('pages.register.errors.max_150_char'),
                [constants.django.errors.invalid_email]: this.$t('pages.register.errors.invalid_email'),
                [constants.django.errors.password_min_8_char]: this.$t('pages.register.errors.password_min_8_char'),
                [constants.django.errors.password_too_common]: this.$t('pages.register.errors.password_too_common'),
                [constants.django.errors.password_entirely_numeric]: this.$t('pages.register.errors.password_entirely_numeric'),
                [constants.django.errors.username_already_exists]: this.$t('pages.register.errors.email_already_exists'),
                default: this.$t('pages.register.errors.field_contains_errors'),
            }

            return (OBJ[DJANGO_ERROR] || OBJ.default)
        },
        register () {
            /**
             * trigger register API call
             */
            this.errors = {}
            this.isLoading = true
            registerApi({
                email: this.form.email,
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                password: this.form.password,
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
        validateInput ({ TYPE, VALUE }) {
            /**
             * validate user input on the client side before form is submitted
             * this method rather than HTML in-line validation was used as in-line
             * validation failed to prevent form from being submitted if value is less
             * than 8 char. also unable to correct set regex pattern in-line.
             */
            const OBJ = {
                password: () => {
                    const REGEX = /^[0-9]*$/
                    if (VALUE.length < 8) return this.getErrorMessage(constants.django.errors.password_min_8_char)
                    if (REGEX.test(VALUE)) return this.getErrorMessage(constants.django.errors.password_entirely_numeric)
                },
                default: this.$t('pages.register.errors.field_contains_errors'),
            }

            if (typeof OBJ[TYPE] === 'function') return OBJ[TYPE]()
            else return OBJ.default
        },
        setErrors (ERRORS) {
            /**
             * assigns error to error object. errors within object are then
             * displayed to the user underneath relevent input
             */
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
