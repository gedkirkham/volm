import constants from '../../../src/constants.js'
import i18n_en_us from '../../../src/i18n/en-us/index.js'

Cypress.Commands.add('registrationSubmitButton', () => {
    cy.get('button')
        .contains('Register')
})

Cypress.Commands.add('registrationFirstNameInput', () => {
    cy.get('[data-test=firstName] input')
})

Cypress.Commands.add('registrationLastNameInput', () => {
    cy.get('[data-test=lastName] input')
})

Cypress.Commands.add('registrationEmailInput', () => {
    cy.get('[data-test=email] input')
})

Cypress.Commands.add('registrationPasswordInput', () => {
    cy.get('[data-test=password] input')
})

Cypress.Commands.add('registrationFirstNameWrapper', () => {
    cy.get('[data-test=firstName]')
})

Cypress.Commands.add('registrationLastNameWrapper', () => {
    cy.get('[data-test=lastName]')
})

Cypress.Commands.add('registrationEmailWrapper', () => {
    cy.get('[data-test=email]')
})

Cypress.Commands.add('registrationPasswordWrapper', () => {
    cy.get('[data-test=password]')
})

Cypress.Commands.add('populateRegistrationForm', emailId => {
    const FIRST_NAME = 'John'
    cy.registrationFirstNameInput()
        .type(FIRST_NAME)
        .should('have.value', FIRST_NAME)

    const LAST_NAME = 'Moore'
    cy.registrationLastNameInput()
        .type(LAST_NAME)
        .should('have.value', LAST_NAME)

    const EMAIL = `${emailId}@test.com`
    cy.registrationEmailInput()
        .type(EMAIL)
        .should('have.value', EMAIL)

    const PASSWORD = '0123456a'
    cy.registrationPasswordInput()
        .type(PASSWORD)
        .should('have.value', PASSWORD)
})

Cypress.Commands.add('registrationPasswordInputValue', VALUE => {
    cy.registrationPasswordInput()
        .clear()
        .type(VALUE)
        .should('have.value', VALUE)
        .type('{enter}')
})

Cypress.Commands.add('registrationCheckPasswordFieldContainError', KEY => {
    cy.registrationPasswordWrapper()
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

Cypress.Commands.add('navigateToRegistrationPage', () => {
    cy.visit('/#/auth/register')

    cy.hash()
        .should('eq', '#/auth/register')

    cy.get('header')
        .contains('Register')
})

Cypress.Commands.add('createRegisterApiRoute', () => {
    cy.server()
    cy.route({
        method: 'POST',
        url: '/api/register',
    }).as('registerApi')
})
