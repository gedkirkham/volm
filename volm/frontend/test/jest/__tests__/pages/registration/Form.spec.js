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
                provide: {
                    layout: {
                        footer: {},
                        header: {},
                        left: {},
                        right: {},
                    },
                    pageContainer: true,
                },
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

        describe('register()', () => {})

        describe('setErrors()', () => {
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
})
