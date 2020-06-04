/// <reference types="cypress" />

import constants from '../../src/constants.js'
import i18n_en_us from '../../src/i18n/en-us/index.js'

context('Registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/auth/register')
    })

    describe('can register successfully', () => {
        beforeEach(() => {
            cy.server()
            cy.route({
                method: 'POST',
                url: '/api/register',
            }).as('registerApi')

            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
        })

        afterEach(() => {
            cy.wait('@registerApi').then(xhr => {
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
            const FIRST_NAME_30_CHAR = '012345678901234567890123456789'
            cy.registrationFirstNameInput()
                .clear()
                .type(`${FIRST_NAME_30_CHAR}{enter}`)
                .should('have.value', FIRST_NAME_30_CHAR)
        })

        it('if LastName is just under character limit', () => {
            const FIRST_NAME_150_CHAR = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678'
            cy.registrationLastNameInput()
                .clear()
                .type(`${FIRST_NAME_150_CHAR}{enter}`)
                .should('have.value', FIRST_NAME_150_CHAR)
        })

        it('if email is just under character limit', () => {
            const EMAIL_150_CHAR = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@test.com'
            cy.registrationLastNameInput()
                .clear()
                .type(`${EMAIL_150_CHAR}{enter}`)
                .should('have.value', EMAIL_150_CHAR)
        })
    })

    describe('error thrown if', () => {
        beforeEach(() => {
            cy.server()
            cy.route({
                method: 'POST',
                url: '/api/register',
            }).as('registerApi')

            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
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
                const FIRST_NAME_31_CHAR = '0123456789012345678901234567890'
                cy.registrationFirstNameInput()
                    .clear()
                    .type(`${FIRST_NAME_31_CHAR}{enter}`)
                    .should('have.value', FIRST_NAME_31_CHAR)

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
                const LAST_NAME_151_CHAR = '01234567890123456789012345678900123456789012345678901234567890012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890'
                cy.registrationLastNameInput()
                    .clear()
                    .type(`${LAST_NAME_151_CHAR}{enter}`)
                    .should('have.value', LAST_NAME_151_CHAR)

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.last_name.length, 1)
                    assert.strictEqual(xhr.response.body.last_name[0], constants.django.errors.max_150_char)
                })

                cy.registrationLastNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_150_char)
            })
        })

        describe('Email', () => {
            it('is not present', () => {
                cy.registrationEmailInput()
                    .clear()
                    .type('{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.email.length, 1)
                    assert.strictEqual(xhr.response.body.email[0], constants.django.errors.blank)
                })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.blank)
            })

            it('is over character limit', () => {
                const EMAIL_151_CHAR = '0123456789012345678901234567890012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890012345678901234567890123@test.com'
                cy.registrationEmailInput()
                    .clear()
                    .type(`${EMAIL_151_CHAR}{enter}`)
                    .should('have.value', EMAIL_151_CHAR)

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.email.length, 1)
                    assert.strictEqual(xhr.response.body.email[0], constants.django.errors.max_150_char)
                })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_150_char)
            })

            it('is not a valid email', () => {
                const INVALID_EMAIL = 'test&test.com'
                cy.registrationEmailInput()
                    .clear()
                    .type(`${INVALID_EMAIL}{enter}`)
                    .should('have.value', INVALID_EMAIL)

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.email.length, 1)
                    assert.strictEqual(xhr.response.body.email[0], constants.django.errors.invalid_email)
                })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.invalid_email)
            })
        })
    })

    describe('error thrown and cleared for', () => {
        beforeEach(() => {
            cy.server()
            cy.route({
                method: 'POST',
                url: '/api/register',
            }).as('registerApi')

            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
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

            const LAST_NAME = 'Moore'
            cy.registrationLastNameInput()
                .type(`${LAST_NAME}{enter}`)
                .should('have.value', LAST_NAME)

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 201)
            })

            cy.registrationLastNameWrapper()
                .should('not.contain.text', i18n_en_us.pages.register.errors.blank)
        })

        it('Email', () => {
            cy.registrationEmailInput()
                .clear()
                .type('{enter}')

            cy.wait('@registerApi').then(xhr => {
                assert.strictEqual(xhr.status, 400)
                assert.strictEqual(xhr.response.body.email.length, 1)
                assert.strictEqual(xhr.response.body.email[0], constants.django.errors.blank)
            })

            cy.registrationEmailWrapper()
                .contains(i18n_en_us.pages.register.errors.blank)

            const CURRENT_DATE = new Date().getTime()
            const EMAIL = `${CURRENT_DATE}@test.com`
            cy.registrationEmailInput()
                .type(`${EMAIL}{enter}`)
                .should('have.value', EMAIL)

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 201)
            })

            cy.registrationEmailWrapper()
                .should('not.contain.text', i18n_en_us.pages.register.errors.blank)
        })
    })
})
