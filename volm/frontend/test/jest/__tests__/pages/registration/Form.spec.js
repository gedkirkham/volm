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
import { createShallowWrapper } from 'jest/utils/index.js'
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
    let wrapper

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
        wrapper = createShallowWrapper({
            component: Form,
            i18n,
            localVue,
            options: {
                mocks: {
                    $q: {
                        screen: {
                            lt: {
                                sm: jest.mock()
                            }
                        }
                    }
                }
            }
        })
    })

    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    describe('methods', () => {
        describe('getErrorMessage()', () => {
            it('is a function', () => {
                expect(typeof wrapper.vm.getErrorMessage).toBe('function')
            })

            it('returns correct error message', () => {
                const ERROR = wrapper.vm.getErrorMessage(constants.django.errors.blank)
                expect(ERROR).toBe(i18n.t('pages.register.errors.blank'))
            })

            it('returns default error message', () => {
                const ERROR = wrapper.vm.getErrorMessage('random error message')
                expect(ERROR).toBe(i18n.t('pages.register.errors.field_contains_errors'))
            })
        })
    })
})
