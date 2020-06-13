// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import constants from '../../src/constants.js'
import i18n_en_us from '../../src/i18n/en-us/index.js'

Cypress.Commands.add('registrationFirstNameInput', () => {
    cy.get('.test-firstName input')
})

Cypress.Commands.add('registrationLastNameInput', () => {
    cy.get('.test-lastName input')
})

Cypress.Commands.add('registrationEmailInput', () => {
    cy.get('.test-email input')
})

Cypress.Commands.add('registrationPassword1Input', () => {
    cy.get('.test-password_1 input')
})

Cypress.Commands.add('registrationPassword2Input', () => {
    cy.get('.test-password_2 input')
})

Cypress.Commands.add('registrationFirstNameWrapper', () => {
    cy.get('.test-firstName')
})

Cypress.Commands.add('registrationLastNameWrapper', () => {
    cy.get('.test-lastName')
})

Cypress.Commands.add('registrationEmailWrapper', () => {
    cy.get('.test-email')
})

Cypress.Commands.add('registrationPassword1Wrapper', () => {
    cy.get('.test-password_1')
})

Cypress.Commands.add('registrationPassword2Wrapper', () => {
    cy.get('.test-password_2')
})

Cypress.Commands.add('populateRegistrationForm', emailId => {
    const FIRST_NAME = 'John'
    cy.registrationFirstNameInput()
        .type(FIRST_NAME).should('have.value', FIRST_NAME)

    const LAST_NAME = 'Moore'
    cy.registrationLastNameInput()
        .type(LAST_NAME)
        .should('have.value', LAST_NAME)

    const EMAIL = `${emailId}@test.com`
    cy.registrationEmailInput()
        .type(EMAIL)
        .should('have.value', EMAIL)

    const PASSWORD = '0123456a'
    cy.get('.test-password_1 input')
        .type(PASSWORD)
        .should('have.value', PASSWORD)

    cy.get('.test-password_2 input')
        .type(PASSWORD)
        .should('have.value', PASSWORD)
})

Cypress.Commands.add('registrationBothPasswordFieldsInput', (_PASSWORD_1, _PASSWORD_2) => {
    const PASSWORD_1 = _PASSWORD_1
    const PASSWORD_2 = _PASSWORD_2 ? _PASSWORD_2 : PASSWORD_1

    if (PASSWORD_1 === '') {
        cy.registrationPassword1Input()
            .clear()
            .should('have.value', PASSWORD_1)

        cy.registrationPassword2Input()
            .clear()
            .should('have.value', PASSWORD_2)
            .type('{enter}')
    } else {
        cy.registrationPassword1Input()
            .clear()
            .type(PASSWORD_1)
            .should('have.value', PASSWORD_1)

        cy.registrationPassword2Input()
            .clear()
            .type(PASSWORD_2)
            .should('have.value', PASSWORD_2)
            .type('{enter}')
    }
})

Cypress.Commands.add('registrationCheckPasswordFieldsContainError', KEY => {
    cy.registrationPassword1Wrapper()
        .contains(i18n_en_us.pages.register.errors[KEY])

    cy.registrationPassword2Wrapper()
        .contains(i18n_en_us.pages.register.errors[KEY])
})

Cypress.Commands.add('registrationAssertApiResponse', ({ field, key, length, status, }) => {
    cy.server()
    cy.route({
        method: 'POST',
        url: '/api/register',
    }).as('registerApi')

    cy.wait('@registerApi').then(xhr => {
        expect(xhr.method, 'response method').to.equal('POST')
        expect(xhr.url, 'POST url').to.match(/\/api\/register\/$/)
        expect(xhr.status, 'successful POST').to.equal(status)
        expect(xhr.response.body[field].length, 'number of errors').to.equal(length)
        expect(xhr.response.body[field], 'returned errors').to.contain(constants.django.errors[key[0]])
        if (length === 2) expect(xhr.response.body[field], 'returned errors').to.contain(constants.django.errors[key[1]])
    })
})