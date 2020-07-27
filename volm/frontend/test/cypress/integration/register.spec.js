/// <reference types="cypress" />

import constants from '../constants.js'
import i18n_en_us from '../../../src/i18n/en-us/index.js'

context('Registration', () => {
    let email_address
    before(() => {
        cy.navigateToRegistrationPage()

        const CURRENT_DATE = new Date().getTime()
        cy.populateRegistrationForm(CURRENT_DATE)
        email_address = `${CURRENT_DATE}@test.com`

        cy.registrationSubmitButton()
            .click()

        cy.hash()
            .should('eq', '#/auth/confirm_email')
    })

    beforeEach(() => {
        cy.navigateToRegistrationPage()
    })

    it('can NOT fire multiple registration API calls before initial is resolved', () => {
        cy.server()
        cy.route(
            {
                method: 'POST',
                url: '/api/register',
                response: {},
                delay: 1000,
            }).as('registerApi')

        const CURRENT_DATE = new Date().getTime()
        cy.populateRegistrationForm(CURRENT_DATE)

        cy.registrationSubmitButton()
            .click()

        cy.registrationSubmitButton()
            .click({ force: true })

        cy.wait('@registerApi')

        cy.get('@registerApi.all')
            .should('have.length', 1)
    })

    it('loading icon is displayed when the registration button has been clicked', () => {
        const CURRENT_DATE = new Date().getTime()
        cy.populateRegistrationForm(CURRENT_DATE)

        cy.get('[data-test=submit] svg')
            .should('not.exist')

        cy.registrationSubmitButton()
            .click()

        cy.get('[data-test=submit] svg')
            .should('exist')
    })

    it('user can navigate to the log-in page', () => {
        cy.get('[data-test=log-in]')
            .contains('Log')
            .click()

        cy.hash()
            .should('eq', '#/auth/login')
    })

    describe('can register successfully', () => {
        beforeEach(() => {
            cy.createRegisterApiRoute()

            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
        })

        afterEach(() => {
            cy.wait('@registerApi')
                .then(xhr => {
                    assert.strictEqual(xhr.status, 201)
                })

            cy.hash()
                .should('eq', '#/auth/confirm_email')
        })

        it('by clicking the submit button', () => {
            cy.registrationSubmitButton()
                .click()
        })

        it('by clicking "Enter" on the keyboard', () => {
            cy.registrationPasswordInput()
                .type('{enter}')
        })

        describe('if FirstName', () => {
            it('is empty string', () => {
                cy.registrationFirstNameInput()
                    .clear()
            })

            it('is just under character limit', () => {
                cy.registrationFirstNameInput()
                    .clear()
                    .type(`${constants.FIRST_NAME_30_CHAR}{enter}`)
                    .should('have.value', constants.FIRST_NAME_30_CHAR)
            })
        })

        describe('if LastName', () => {
            it('is an empty string', () => {
                cy.registrationLastNameInput()
                    .clear()
            })

            it('is just under character limit', () => {
                cy.registrationLastNameInput()
                    .clear()
                    .type(`${constants.LAST_NAME_150_CHAR}{enter}`)
                    .should('have.value', constants.LAST_NAME_150_CHAR)
            })
        })

        it('if Email is just under character limit', () => {
            const NOW = new Date().getTime()

            cy.registrationLastNameInput()
                .clear()
                .type(`${NOW}${constants.EMAIL_150_CHAR}{enter}`)
                .should('have.value', NOW + constants.EMAIL_150_CHAR)
        })

        it('if Password is just under character limit', () => {
            cy.registrationPasswordInputValue(constants.PASSWORD_128_CHAR)
        })
    })

    describe('error thrown if', () => {
        beforeEach(() => {
            cy.createRegisterApiRoute()

            const CURRENT_DATE = new Date().getTime()
            cy.populateRegistrationForm(CURRENT_DATE)
        })

        describe('FirstName', () => {
            it('is over character limit', () => {
                cy.registrationFirstNameInput()
                    .clear()
                    .type(`${constants.FIRST_NAME_31_CHAR}{enter}`)
                    .should('have.value', constants.FIRST_NAME_31_CHAR.slice(0, constants.FIRST_NAME_31_CHAR.length - 1))

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 201)
                })
            })
        })

        describe('LastName', () => {

            it('is over character limit', () => {
                cy.registrationLastNameInput()
                    .clear()
                    .type(`${constants.LAST_NAME_151_CHAR}{enter}`)
                    .should('have.value', constants.LAST_NAME_151_CHAR.slice(0, constants.LAST_NAME_151_CHAR.length - 1))

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 201)
                })
            })
        })

        describe('Email', () => {
            it('is not present', () => {
                cy.registrationEmailInput()
                    .clear()
                    .type('{enter}')

                cy.get('@registerApi.all')
                    .should('have.length', 0)
            })

            it('is over character limit', () => {
                const NOW = new Date().getTime()
                cy.registrationEmailInput()
                    .clear()
                    .type(`${NOW}${constants.EMAIL_151_CHAR}{enter}`)
                    .should('have.value', NOW + constants.EMAIL_151_CHAR.slice(0, constants.EMAIL_151_CHAR.length - 1))

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 201)
                })
            })

            it('is not a valid email', () => {
                const INVALID_EMAIL = 'test&test.com'
                cy.registrationEmailInput()
                    .clear()
                    .type(`${INVALID_EMAIL}`)
                    .should('have.value', INVALID_EMAIL)
                    .type('{enter}')

                cy.get('@registerApi.all')
                    .should('have.length', 0)
            })

            it('has already been used', () => {
                const KEY = ['username_already_exists']

                cy.registrationEmailInput()
                    .clear()
                    .type(email_address)
                    .should('have.value', email_address)

                cy.registrationSubmitButton()
                    .click()

                cy.registrationAssertApiResponse({ field: 'username', key: KEY, length: 1, status: 400 })

                cy.registrationEmailWrapper()
                    .contains(i18n_en_us.pages.register.errors.email_already_exists)
            })
        })

        describe('Password', () => {
            it('is not present', () => {
                cy.registrationPasswordInput()
                    .clear()
                    .type('{enter}')

                cy.get('@registerApi.all')
                    .should('have.length', 0)
            })

            it('is over max-character limit', () => {
                const ORIG_PASSWORD = constants.PASSWORD_129_CHAR
                const TRUNCATED_PASSWORD = ORIG_PASSWORD.slice(0, ORIG_PASSWORD.length - 1)
                cy.registrationPasswordInput()
                    .clear()
                    .type(ORIG_PASSWORD)
                    .should('have.value', TRUNCATED_PASSWORD)
                    .type('{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 201)
                })
            })

            it('is under min-character limit', () => {
                const PASSWORD = '012345a'
                cy.registrationPasswordInputValue(PASSWORD)

                cy.get('@registerApi.all')
                    .should('have.length', 0)
            })

            it('is too common', () => {
                const KEY = ['password_too_common']
                const PASSWORD = 'password'
                cy.registrationPasswordInputValue(PASSWORD)
                cy.registrationAssertApiResponse({ field: 'password', key: KEY, length: 1, status: 400 })
                cy.registrationCheckPasswordFieldContainError(KEY)
            })

            it('is entirely numeric', () => {
                const PASSWORD = '84750183'
                cy.registrationPasswordInputValue(PASSWORD)

                cy.get('@registerApi.all')
                    .should('have.length', 0)
            })
        })
    })
})
