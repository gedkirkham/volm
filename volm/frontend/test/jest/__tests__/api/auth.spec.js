/* eslint-disable */
/**
 * @jest-environment jsdom
 */
// import Vue from 'vue'
import Vue from 'vue';

import { registerApi } from 'src/api/auth.js'

jest.mock('vue', () => ({
    http: {
        post: jest.fn(),
        finally: jest.fn(),
    }
}))

const PAY_LOAD = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_2: '',
    username: '',
}

describe('api/auth.js ', () => {
    describe('registerApi()', () => {
        it('is a function', () => {
            expect(typeof registerApi).toBe('function')
        })

        it('calls a REST POST method', () => {})
        it('calls a REST POST method with the correct params', () => {})
        it('sets loading property to true', () => {})
        it('sets loading property to false once resolved', () => {})

        it('returns Promise if Promise is yet to be resolved', async () => {
            Vue.http.post.mockImplementation(() => Promise.resolve(Promise))
            const PROMISE = registerApi(PAY_LOAD)
            await registerApi(PAY_LOAD)
            expect(Vue.http.post).toBeCalledTimes(1)
            expect(PROMISE instanceof Promise).toBe(true)
        })

        it('throws error if not all object properties are present', () => {})
    })
})
