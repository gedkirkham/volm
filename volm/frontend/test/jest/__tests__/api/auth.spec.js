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
    email: 'test@test.com',
    first_name: 'John',
    last_name: 'Moore',
    password_1: 'password123',
    password_2: 'password1234',
}

describe('api/auth.js ', () => {
    beforeAll(() => {
        process.env.API = 'http://test.com'
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    describe('registerApi()', () => {
        it('is a function', () => {
            expect(typeof registerApi).toBe('function')
        })

        it('calls a REST POST method', async () => {
            Vue.http.post.mockImplementation(() => Promise.resolve(Promise))
            expect(Vue.http.post).toBeCalledTimes(0)
            await registerApi(PAY_LOAD)
            expect(Vue.http.post).toBeCalledTimes(1)
        })

        it('calls a REST POST method with the correct params', async () => {
            Vue.http.post.mockImplementation(() => Promise.resolve(Promise))
            expect(Vue.http.post).toBeCalledTimes(0)
            await registerApi(PAY_LOAD)
            expect(Vue.http.post).toBeCalledWith(process.env.API + '/register/', {
                email: PAY_LOAD.email,
                first_name: PAY_LOAD.first_name,
                last_name: PAY_LOAD.last_name,
                password: PAY_LOAD.password_1,
                password_2: PAY_LOAD.password_2,
                username: PAY_LOAD.email,
            })
        })

        it('returns Promise if Promise is yet to be resolved', async () => {
            Vue.http.post.mockImplementation(() => Promise.resolve(Promise))
            const PROMISE = registerApi(PAY_LOAD)
            await registerApi(PAY_LOAD)
            expect(Vue.http.post).toBeCalledTimes(1)
            expect(PROMISE instanceof Promise).toBe(true)
        })
    })
})
