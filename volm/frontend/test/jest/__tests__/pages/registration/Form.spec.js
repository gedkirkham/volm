/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import {
    createLocalVue,
    enableAutoDestroy,
} from '@vue/test-utils'
import Form from 'src/pages/registration/Form.vue'
import * as All from 'quasar'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import {
    createShallowWrapper,
    createMountedWrapper,
} from 'jest/utils/index.js'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

import constants from 'src/constants.js'
import messages from 'src/i18n'

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

enableAutoDestroy(afterEach)


import { registerApi } from 'src/api/auth.js'

jest.mock('src/api/auth.js', () => ({
    registerApi: jest.fn()
}))

describe('Registration From', () => {
    let mountedWrapper
    let shallowWrapper

    const localVue = createLocalVue()
    localVue.use(Quasar, { components }) // , lang: langEn
    localVue.use(VueRouter)
    localVue.use(VueI18n)

    const i18n = new VueI18n({
        locale: 'en-us',
        fallbackLocale: 'en-us',
        messages,
    })

    const PROVIDE = {
        layout: {
            footer: {},
            header: {},
            left: {},
            right: {},
        },
        pageContainer: true,
    }

    beforeEach(() => {
        shallowWrapper = createShallowWrapper({
            component: Form,
            i18n,
            localVue,
            options: {
                mocks: {
                    $q: {
                        screen: {
                            lt: {
                                sm: jest.mock(),
                            },
                        },
                    },
                },
            },
        })

        mountedWrapper = createMountedWrapper({
            component: Form,
            i18n,
            localVue,
            options: {
                provide: PROVIDE,
            },
        })
    })

    it('passes the sanity check and creates a wrapper', () => {
        expect(shallowWrapper.exists()).toBe(true)
    })

    it('renders correctly', () => {
        expect(shallowWrapper).toMatchSnapshot()
    })

    describe('methods', () => {
        describe('getErrorMessage()', () => {
            it('is a function', () => {
                expect(typeof shallowWrapper.vm.getErrorMessage).toBe('function')
            })

            it('returns correct error message', () => {
                const ERROR = shallowWrapper.vm.getErrorMessage(constants.django.errors.blank)
                expect(ERROR).toBe(i18n.t('pages.register.errors.blank'))
            })

            it('returns default error message', () => {
                const ERROR = shallowWrapper.vm.getErrorMessage('random error message')
                expect(ERROR).toBe(i18n.t('pages.register.errors.field_contains_errors'))
            })
        })

        describe('register()', () => {
            it('is a function', () => {
                expect(typeof shallowWrapper.vm.register).toBe('function')
            })

            it('is called when the form is submitted', async () => {
                mountedWrapper.vm.register = jest.fn()
                expect(mountedWrapper.vm.register).toHaveBeenCalledTimes(0)
                await mountedWrapper.get('form').trigger('submit')
                expect(mountedWrapper.vm.register).toHaveBeenCalledTimes(1)
            })

            it('sets "isLoading" to true', async () => {
                registerApi.mockResolvedValueOnce()
                expect(shallowWrapper.vm.isLoading).toBe(false)
                shallowWrapper.vm.register()
                expect(shallowWrapper.vm.isLoading).toBe(true)
            })

            it('sets "errors" to empty object', async () => {
                registerApi.mockResolvedValueOnce()
                const ERROR = 'Error message'
                await shallowWrapper.setData({
                    errors: {
                        first_name: ERROR,
                    },
                })
                expect(shallowWrapper.vm.errors).toStrictEqual({
                    first_name: ERROR,
                })
                shallowWrapper.vm.register()
                expect(shallowWrapper.vm.errors).toStrictEqual({})
            })

            it('calls registerApi with the correct params', () => {
                registerApi.mockResolvedValueOnce()
                shallowWrapper.vm.register()
                expect(registerApi).toBeCalledWith({
                    email: '',
                    first_name: '',
                    last_name: '',
                    password_1: '',
                    password_2: '',
                })
            })

            describe('registerApi', () => {
                it('upon success, pushes new route', async () => {
                    registerApi.mockResolvedValue()
                    shallowWrapper.vm.$router.push = jest.fn()
                    expect(shallowWrapper.vm.$router.push).toHaveBeenCalledTimes(0)
                    await shallowWrapper.vm.register()
                    expect(shallowWrapper.vm.$router.push).toHaveBeenCalledTimes(1)
                    expect(shallowWrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'confirm_email' })
                })

                it('upon failure, calls "setErrors" with correct params', async () => {
                    global.console = { error: jest.fn() }
                    shallowWrapper.vm.setErrors = jest.fn()
                    registerApi.mockRejectedValue({ body: 'Error message' })
                    expect(shallowWrapper.vm.setErrors).toBeCalledTimes(0)
                    await shallowWrapper.vm.register()
                    expect(shallowWrapper.vm.setErrors).toBeCalledTimes(1)
                    expect(console.error).toBeCalledTimes(1)
                })

                it('upon response, sets "isLoading" to false', async () => {
                    registerApi.mockResolvedValue()
                    expect(shallowWrapper.vm.isLoading).toBe(false)
                    await shallowWrapper.vm.register()
                    expect(shallowWrapper.vm.isLoading).toBe(false)
                })
            })
        })

        describe('setErrors()', () => {
            it('is a function', () => {
                expect(typeof shallowWrapper.vm.setErrors).toBe('function')
            })

            it('can set a single error and the component state updates correctly', () => {
                expect(shallowWrapper.vm.errors).toStrictEqual({})
                const ERROR = {
                    'first_name': [constants.django.errors.blank],
                }
                shallowWrapper.vm.setErrors(ERROR)
                expect(shallowWrapper.vm.errors).toStrictEqual({
                    'first_name': i18n.t('pages.register.errors.blank'),
                })
            })

            it('can set a multiple errors', () => {
                expect(shallowWrapper.vm.errors).toStrictEqual({})
                const ERRORS = {
                    'first_name': [constants.django.errors.blank, constants.django.errors.max_30_char],
                }
                shallowWrapper.vm.setErrors(ERRORS)
                expect(shallowWrapper.vm.errors).toStrictEqual({
                    'first_name': `${i18n.t('pages.register.errors.blank')}. ${i18n.t('pages.register.errors.max_30_char')}`,
                })
            })

            it('errors are displayed correctly', async () => {
                await mountedWrapper.setData({
                    errors: {
                        first_name: 'This is my test error!',
                    },
                })
                const element = mountedWrapper.find('[data-test=firstName]')
                expect(element).toMatchSnapshot()
            })

            it('"username" key is translated to "email"', () => {
                expect(shallowWrapper.vm.errors).toStrictEqual({})
                const ERROR = {
                    'username': [constants.django.errors.blank],
                }
                shallowWrapper.vm.setErrors(ERROR)
                expect(shallowWrapper.vm.errors).toStrictEqual({
                    'email': i18n.t('pages.register.errors.blank'),
                })
            })
        })
    })

    describe('state correctly updates when user enters data for', () => {
        beforeEach(() => {
            expect(mountedWrapper.vm.first_name).toBe('')
            expect(mountedWrapper.vm.last_name).toBe('')
            expect(mountedWrapper.vm.email).toBe('')
            expect(mountedWrapper.vm.password_1).toBe('')
            expect(mountedWrapper.vm.password_2).toBe('')
        })

        it('first name form field', () => {
            const VALUE = 'John'
            const INPUT_FIELD = mountedWrapper.find('[data-test=firstName] input')
            INPUT_FIELD.setValue(VALUE)
            expect(mountedWrapper.vm.first_name).toBe(VALUE)
        })

        it('last name form field', () => {
            const VALUE = 'Moore'
            const INPUT_FIELD = mountedWrapper.find('[data-test=lastName] input')
            INPUT_FIELD.setValue(VALUE)
            expect(mountedWrapper.vm.last_name).toBe(VALUE)
        })

        it('email form field', () => {
            const VALUE = 'test@test.com'
            const INPUT_FIELD = mountedWrapper.find('[data-test=email] input')
            INPUT_FIELD.setValue(VALUE)
            expect(mountedWrapper.vm.email).toBe(VALUE)
        })

        it('password form field', () => {
            const VALUE = 'password123'
            const INPUT_FIELD = mountedWrapper.find('[data-test=password_1] input')
            INPUT_FIELD.setValue(VALUE)
            expect(mountedWrapper.vm.password_1).toBe(VALUE)
        })

        it('confirm password form field', () => {
            const VALUE = 'password1234'
            const INPUT_FIELD = mountedWrapper.find('[data-test=password_2] input')
            INPUT_FIELD.setValue(VALUE)
            expect(mountedWrapper.vm.password_2).toBe(VALUE)
        })
    })

    describe('constants exist', () => {
        it('constants.django.errors.blank', () => {
            expect(constants.django.errors.blank).toBeTruthy()
        })

        it('constants.django.errors.max_30_char', () => {
            expect(constants.django.errors.max_30_char).toBeTruthy()
        })

        it('constants.django.errors.max_128_char', () => {
            expect(constants.django.errors.max_128_char).toBeTruthy()
        })

        it('constants.django.errors.max_150_char', () => {
            expect(constants.django.errors.max_150_char).toBeTruthy()
        })

        it('constants.django.errors.invalid_email', () => {
            expect(constants.django.errors.invalid_email).toBeTruthy()
        })

        it('constants.django.errors.password_mismatch', () => {
            expect(constants.django.errors.password_mismatch).toBeTruthy()
        })

        it('constants.django.errors.password_min_8_char', () => {
            expect(constants.django.errors.password_min_8_char).toBeTruthy()
        })

        it('constants.django.errors.password_too_common', () => {
            expect(constants.django.errors.password_too_common).toBeTruthy()
        })

        it('constants.django.errors.password_entirely_numeric', () => {
            expect(constants.django.errors.password_entirely_numeric).toBeTruthy()
        })

        it('constants.django.errors.username_already_exists', () => {
            expect(constants.django.errors.username_already_exists).toBeTruthy()
        })
    })

    describe('i18 values exist', () => {
        it('pages.register.errors.blank', () => {
            expect(messages['en-us'].pages.register.errors.blank).not.toBeUndefined()
        })

        it('pages.register.errors.max_30_char', () => {
            expect(messages['en-us'].pages.register.errors.max_30_char).not.toBeUndefined()
        })

        it('pages.register.errors.max_128_char', () => {
            expect(messages['en-us'].pages.register.errors.max_128_char).not.toBeUndefined()
        })

        it('pages.register.errors.max_150_char', () => {
            expect(messages['en-us'].pages.register.errors.max_150_char).not.toBeUndefined()
        })

        it('pages.register.errors.invalid_email', () => {
            expect(messages['en-us'].pages.register.errors.invalid_email).not.toBeUndefined()
        })

        it('pages.register.errors.password_mismatch', () => {
            expect(messages['en-us'].pages.register.errors.password_mismatch).not.toBeUndefined()
        })

        it('pages.register.errors.password_min_8_char', () => {
            expect(messages['en-us'].pages.register.errors.password_min_8_char).not.toBeUndefined()
        })

        it('pages.register.errors.password_too_common', () => {
            expect(messages['en-us'].pages.register.errors.password_too_common).not.toBeUndefined()
        })

        it('pages.register.errors.password_entirely_numeric', () => {
            expect(messages['en-us'].pages.register.errors.password_entirely_numeric).not.toBeUndefined()
        })

        it('pages.register.errors.username_already_exists', () => {
            expect(messages['en-us'].pages.register.errors.email_already_exists).not.toBeUndefined()
        })
    })
})
