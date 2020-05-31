/// <reference types="cypress" />

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

        it('if FirstName is not present', () => {
            cy.registrationFirstNameInput()
                .clear()

            cy.get('#test-submit')
                .click()

            cy.wait('@registerApi').then((xhr) => {
                assert.strictEqual(xhr.status, 400)
                // assert.strictEqual(xhr.response, 400) //TODO: add check to ensure that error response is correct
            })
        })

        it('if FirstName is in-valid', () => {})
    })
  })
