/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { registerApi } from 'src/api/auth.js'

describe('api/auth.js ', () => {
    describe('registerApi()', () => {
        it('is a function', () => {
            expect(typeof registerApi).toBe('function')
        })

        it('calls a REST POST method', () => {})
        it('calls a REST POST method with the correct params', () => {})
        it('sets loading property to true', () => {})
        it('sets loading property to false once resolved', () => {})
        it('returns promise if currently "loading"', () => {})
        it('throws error if not all object properties are present', () => {})
    })
})
