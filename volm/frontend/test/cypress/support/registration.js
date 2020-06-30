import constants from '../../../src/constants.js'
import i18n_en_us from '../../../src/i18n/en-us/index.js'

Cypress.Commands.add('registrationSubmitButton', () => {
    cy.contains('Submit')
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

Cypress.Commands.add('registrationPassword1Input', () => {
    cy.get('[data-test=password_1] input')
})

Cypress.Commands.add('registrationPassword2Input', () => {
    cy.get('[data-test=password_2] input')
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

Cypress.Commands.add('registrationPassword1Wrapper', () => {
    cy.get('[data-test=password_1]')
})

Cypress.Commands.add('registrationPassword2Wrapper', () => {
    cy.get('[data-test=password_2]')
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
    cy.registrationPassword1Input()
        .type(PASSWORD)
        .should('have.value', PASSWORD)

    cy.registrationPassword2Input()
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
