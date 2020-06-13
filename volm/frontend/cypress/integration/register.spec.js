/// <reference types="cypress" />

import constants from '../../src/constants.js'
import i18n_en_us from '../../src/i18n/en-us/index.js'

context('Registration', () => {
    beforeEach(() => {
    cy.server()
        cy.route({
            method: 'POST',
            url: '/api/register',
        }).as('registerApi')

      cy.visit('http://localhost:8080/#/auth/register')
    })

    it('can NOT fire multiple registration API calls before initial is resolved', () => {
            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)

            cy.get('#test-submit')
                .click()

            cy.get('#test-submit')
                .click()

            cy.wait('@registerApi')

            cy.get('@registerApi.all')
                .should('have.length', 1)
                .then(xhrs => {
                    assert.strictEqual(xhrs[0].status, 201)
                })
    })

    describe('can register successfully', () => {
        beforeEach(() => {
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

        it('if Email is just under character limit', () => {
            const EMAIL_150_CHAR = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@test.com'
            cy.registrationLastNameInput()
                .clear()
                .type(`${EMAIL_150_CHAR}{enter}`)
                .should('have.value', EMAIL_150_CHAR)
        })

        it('if Password is just under character limit', () => {
            const PASSWORD_128_CHAR = '0123456789012345678901234567890012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890012a'
            cy.registrationBothPasswordFieldsInput(PASSWORD_128_CHAR)
        })
    })

    describe('error thrown if', () => {
        beforeEach(() => {
            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
        })

        describe('FirstName', () => {
            it('is not present', () => {
                const KEY = ['blank']
                cy.registrationFirstNameInput()
                    .clear()
                    .type('{enter}')

                cy.registrationAssertApiResponse({ field: 'first_name', key: KEY, length: 1, status: 400 })

                cy.registrationFirstNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.blank)
            })

            it('is over character limit', () => {
                const KEY = ['max_30_char']
                const FIRST_NAME_31_CHAR = '0123456789012345678901234567890'
                cy.registrationFirstNameInput()
                    .clear()
                    .type(`${FIRST_NAME_31_CHAR}{enter}`)
                    .should('have.value', FIRST_NAME_31_CHAR)

                cy.registrationAssertApiResponse({ field: 'first_name', key: KEY, length: 1, status: 400 })

                cy.registrationFirstNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_30_char)
            })
        })

        describe('LastName', () => {
            it('is not present', () => {
                const KEY = ['blank']
                cy.registrationLastNameInput()
                    .clear()
                    .type('{enter}')

                cy.registrationAssertApiResponse({ field: 'last_name', key: KEY, length: 1, status: 400 })

                cy.registrationLastNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.blank)
            })

            it('is over character limit', () => {
                const KEY = ['max_150_char']
                const LAST_NAME_151_CHAR = '01234567890123456789012345678900123456789012345678901234567890012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890'
                cy.registrationLastNameInput()
                    .clear()
                    .type(`${LAST_NAME_151_CHAR}{enter}`)
                    .should('have.value', LAST_NAME_151_CHAR)

                cy.registrationAssertApiResponse({ field: 'last_name', key: KEY, length: 1, status: 400 })

                cy.registrationLastNameWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_150_char)
            })
        })

        describe('Email', () => {
            it('is not present', () => {
                const KEY = ['blank']
                cy.registrationEmailInput()
                    .clear()
                    .type('{enter}')

                cy.registrationAssertApiResponse({ field: 'email', key: KEY, length: 1, status: 400 })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.blank)
            })

            it('is over character limit', () => {
                const KEY = ['max_150_char']
                const EMAIL_151_CHAR = '0123456789012345678901234567890012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890012345678901234567890123@test.com'
                cy.registrationEmailInput()
                    .clear()
                    .type(`${EMAIL_151_CHAR}{enter}`)
                    .should('have.value', EMAIL_151_CHAR)

                cy.registrationAssertApiResponse({ field: 'email', key: KEY, length: 1, status: 400 })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.max_150_char)
            })

            it('is not a valid email', () => {
                const KEY = ['invalid_email']
                const INVALID_EMAIL = 'test&test.com'
                cy.registrationEmailInput()
                    .clear()
                    .type(`${INVALID_EMAIL}{enter}`)
                    .should('have.value', INVALID_EMAIL)

                cy.registrationAssertApiResponse({ field: 'email', key: KEY, length: 1, status: 400 })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.invalid_email)
            })
        })

        describe('Password', () => {
            it('is not present', () => {
                const KEY = ['blank']
                cy.registrationPassword1Input()
                    .clear()
                    .type('{enter}')

                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('is over max-character limit', () => {
                const KEY = ['max_128_char']
                const PASSWORD_129_CHAR = '012345678901234567890123456789001234567890123456789012345678900123456789012345678901234567890012345678901234567890123456789001abc'
                cy.registrationBothPasswordFieldsInput(PASSWORD_129_CHAR)
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('is under min-character limit', () => {
                const KEY = ['password_min_8_char']
                cy.registrationBothPasswordFieldsInput('012345a')
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('do not match', () => {
                const KEY = ['password_mismatch']
                const PASSWORD = '012345abc'
                cy.registrationBothPasswordFieldsInput(PASSWORD, PASSWORD + 'd')
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('is too common', () => {
                const KEY = ['password_too_common']
                const PASSWORD = 'password'
                cy.registrationBothPasswordFieldsInput(PASSWORD)
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('is entirely numeric', () => {
                const KEY = ['password_entirely_numeric']
                const PASSWORD = '84750183'
                cy.registrationBothPasswordFieldsInput(PASSWORD)
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('is entirely numeric and passwords do not match', () => {
                const KEY = ['password_mismatch']
                const PASSWORD = '84750183'
                cy.registrationBothPasswordFieldsInput(PASSWORD, PASSWORD + '0')
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldsContainError(KEY)
            })

            it('is entirely numeric and too common', () => {
                const KEY = ['password_entirely_numeric', 'password_too_common']
                const PASSWORD = '01234567'
                cy.registrationBothPasswordFieldsInput(PASSWORD)
                cy.registrationAssertApiResponse({ field: 'password', status: 400, length: 2, key: KEY })
                cy.registrationCheckPasswordFieldsContainError(KEY[0])
                cy.registrationCheckPasswordFieldsContainError(KEY[1])
            })
        })
    })

    describe('error thrown and cleared for', () => {
        beforeEach(() => {
            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
        })

        it('FirstName', () => {
            const KEY = ['blank']
            cy.registrationFirstNameInput()
                .clear()
                .type('{enter}')

            cy.registrationAssertApiResponse({ field: 'first_name', key: KEY, length: 1, status: 400 })

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
            const KEY = ['blank']
            cy.registrationLastNameInput()
                .clear()
                .type('{enter}')

            cy.registrationAssertApiResponse({ field: 'last_name', key: KEY, length: 1, status: 400 })

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
            const KEY = ['blank']
            cy.registrationEmailInput()
                .clear()
                .type('{enter}')

            cy.registrationAssertApiResponse({ field: 'email', key: KEY, length: 1, status: 400 })

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

        it('Password', () => {
            const KEY = ['blank']
            cy.registrationBothPasswordFieldsInput('')
            cy.registrationAssertApiResponse({ field: 'password', status: 400, length: 1, key: KEY})
            cy.registrationCheckPasswordFieldsContainError(KEY)

            cy.registrationBothPasswordFieldsInput('01234567a')

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 201)
            })

            cy.registrationPassword1Wrapper()
                .should('not.contain.text', i18n_en_us.pages.register.errors[KEY])

            cy.registrationPassword2Wrapper()
                .should('not.contain.text', i18n_en_us.pages.register.errors[KEY])
        })
    })
})
