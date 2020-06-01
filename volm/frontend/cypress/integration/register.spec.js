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

        it('if FirstName is just under character limit', () => {
            cy.registrationFirstNameInput()
                .clear()
                .type('012345678901234567890123456789{enter}')
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
                    assert.strictEqual(xhr.response.body.first_name[0], 'This field may not be blank.')
                })

                // TODO: Check visual error is thrown
            })

            it('is over character limit', () => {
                cy.registrationFirstNameInput()
                    .type('0123456789012345678901234567890{enter}')

                cy.wait('@registerApi').then((xhr) => {
                    assert.strictEqual(xhr.status, 400)
                    assert.strictEqual(xhr.response.body.first_name.length, 1)
                    assert.strictEqual(xhr.response.body.first_name[0], 'Ensure this field has no more than 30 characters.')
                })

                // TODO: Check visual error is thrown
            })
        })
    })
  })
