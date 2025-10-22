/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: "element"}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: "optional"}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginBack(): Chainable<string>;
        loginFront(): Chainable<string>;
        cleanCart(): Chainable<string>;
    }
}

Cypress.Commands.add("loginBack", () => {
  
  return cy.request({
    method: "POST",
    url: "http://localhost:8081/login",
    body: {
      username: "test2@test.fr",
      password: "testtest",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body.token;
  });
});

Cypress.Commands.add("loginFront", () => {
  cy.visit("http://localhost:4200/#/login");
    cy.get("[data-cy='nav-link-login']").click();
    cy.get("[data-cy='login-input-username']").type("test2@test.fr");
    cy.get("[data-cy='login-input-password']").type("testtest");
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='nav-link-logout']").should("exist");
    cy.log("connecté")
});

Cypress.Commands.add("cleanCart", () => {
  cy.visit("http://localhost:4200/#/cart");
  cy.get("[data-cy='cart-line-delete']").each(($btn) => {
    cy.wrap($btn).click();
  })
})

/**
 * 
 */