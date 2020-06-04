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

Cypress.Commands.add('registrationFirstNameInput', () => {
    cy.get('.test-firstName input')
})

Cypress.Commands.add('registrationLastNameInput', () => {
    cy.get('.test-lastName input')
})

Cypress.Commands.add('registrationEmailInput', () => {
    cy.get('.test-email input')
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

    const PASSWORD = 'password123'
    cy.get('.test-password_1 input')
        .type(PASSWORD)
        .should('have.value', PASSWORD)

    cy.get('.test-password_2 input')
        .type(PASSWORD)
        .should('have.value', PASSWORD)
})
