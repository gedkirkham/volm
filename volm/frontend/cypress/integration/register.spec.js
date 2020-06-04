/// <reference types="cypress" />

import constants from '../../src/constants.js'
import i18n_en_us from '../../src/i18n/en-us/index.js'

context('Registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/auth/register')
    })

    describe('can register successfully', () => {
        let emailId = 0
        beforeEach(() => {
            cy.server()
            cy.route({
                method: 'POST',
                url: '/api/register',
            }).as('registerApi')

            const CURRENT_DATE = new Date().getTime()
            cy.registrationPopulateForm(CURRENT_DATE + ++emailId)
        })

        afterEach(() => {
            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 201)
            })
        })

        it('by clicking the submit button', () => {
            cy.get('#test-submit')
                .click()
        })

        it('by clicking "Enter" on the keyboard', () => {
            cy.get('.test-password_2 input')
                .type('{enter}')
        })

        it('if FirstName is just under character limit', () => {
            cy.registrationFirstNameInput()
                .clear()
                .type('012345678901234567890123456789{enter}')
        })

        it('if LastName is just under character limit', () => {
            cy.registrationLastNameInput()
                .clear()
                .type('01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678{enter}')
        })
    })

    describe('error thrown if', () => {
        let emailId = 0
        beforeEach(() => {
            cy.server()
            cy.route({
                method: 'POST',
                url: '/api/register',
            }).as('registerApi')

            const CURRENT_DATE = new Date().getTime()
            emailId = cy.registrationPopulateForm(CURRENT_DATE + ++emailId)
        })

        describe('FirstName', () => {
            it('is not present', () => {
                cy.registrationFirstNameInput()
                    .clear()
                    .type('{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.first_name.length, 1)
                    assert.strictEqual(xhr.response.body.first_name[0], constants.django.errors.blank)
                })

                cy.registrationFirstNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.blank)
            })

            it('is over character limit', () => {
                cy.registrationFirstNameInput()
                    .clear()
                    .type('0123456789012345678901234567890{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.first_name.length, 1)
                    assert.strictEqual(xhr.response.body.first_name[0], constants.django.errors.max_30_char)
                })

                cy.registrationFirstNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_30_char)
            })
        })

        describe('LastName', () => {
            it('is not present', () => {
                cy.registrationLastNameInput()
                    .clear()
                    .type('{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.last_name.length, 1)
                    assert.strictEqual(xhr.response.body.last_name[0], constants.django.errors.blank)
                })

                cy.registrationLastNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.blank)
            })

            it('is over character limit', () => {
                cy.registrationLastNameInput()
                    .clear()
                    .type('01234567890123456789012345678900123456789012345678901234567890012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.last_name.length, 1)
                    assert.strictEqual(xhr.response.body.last_name[0], constants.django.errors.max_150_char)
                })

                cy.registrationLastNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_150_char)
            })
        })
    })

    describe('error thrown and cleared for', () => {
        let emailId = 0
        beforeEach(() => {
            cy.server()
            cy.route({
                method: 'POST',
                url: '/api/register',
            }).as('registerApi')

            const CURRENT_DATE = new Date().getTime()
            emailId = cy.registrationPopulateForm(CURRENT_DATE + ++emailId)
        })

        it('FirstName', () => {
            cy.registrationFirstNameInput()
                .clear()
                .type('{enter}')

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 400)
                assert.strictEqual(xhr.response.body.first_name.length, 1)
                assert.strictEqual(xhr.response.body.first_name[0], constants.django.errors.blank)
            })

            cy.registrationFirstNameWrapper()
                .contains(i18n_en_us.pages.register.errors.blank)

            cy.registrationFirstNameInput()
                .type('John{enter}')

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 201)
            })

            cy.registrationFirstNameWrapper()
                .should('not.contain.text', i18n_en_us.pages.register.errors.blank)
        })

        it('LastName', () => {
            cy.registrationLastNameInput()
                .clear()
                .type('{enter}')

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 400)
                assert.strictEqual(xhr.response.body.last_name.length, 1)
                assert.strictEqual(xhr.response.body.last_name[0], constants.django.errors.blank)
            })

            cy.registrationLastNameWrapper()
                .contains(i18n_en_us.pages.register.errors.blank)

            cy.registrationLastNameInput()
                .type('Moore{enter}')

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 201)
            })

            cy.registrationLastNameWrapper()
                .should('not.contain.text', i18n_en_us.pages.register.errors.blank)
        })
    })
})
