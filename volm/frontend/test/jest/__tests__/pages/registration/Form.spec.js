/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import {
    createLocalVue,
    enableAutoDestroy,
    mount,
    shallowMount,
} from '@vue/test-utils'
import Form from 'src/pages/registration/Form.vue'
import * as All from 'quasar'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
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
    const localVue = createLocalVue()
    localVue.use(Quasar, { components }) // , lang: langEn
    localVue.use(VueRouter)
    localVue.use(VueI18n)

    const router = new VueRouter()

    const i18n = new VueI18n({
        locale: 'en-us',
        fallbackLocale: 'en-us',
        messages,
    })

    const wrapper = shallowMount(Form, {
        i18n,
        localVue,
        router,
    })
    const vm = wrapper.vm

    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    describe('methods', () => {
        describe('getErrorMessage()', () => {
            it('is a function', () => {
                expect(typeof vm.getErrorMessage).toBe('function')
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

    it('accesses the shallowMount', () => {
        expect(vm.$el.textContent).toContain('rocket muffin')
        expect(wrapper.text()).toContain('rocket muffin') // easier
        expect(wrapper.find('p').text()).toContain('rocket muffin')
    })

    it('sets the correct default data', () => {
        expect(typeof vm.counter).toBe('number')
        const defaultData2 = QBUTTON.data()
        expect(defaultData2.counter).toBe(0)
    })

    it('correctly updates data when button is pressed', () => {
        const button = wrapper.find('button')
        button.trigger('click')
        expect(vm.counter).toBe(1)
    })

    it('formats a date without throwing exception', () => {
        // test will automatically fail if an exception is thrown
        // MMMM and MMM require that a language is 'installed' in Quasar
        let formattedString = date.formatDate(Date.now(), 'YYYY MMMM MMM DD')
        console.log('formattedString', formattedString)
    })
})
