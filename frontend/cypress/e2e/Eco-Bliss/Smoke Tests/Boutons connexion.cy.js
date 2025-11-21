describe("Smoke test - Page de connexion", () => {

  /** Dans ce test, on vérifie que tous les champs et boutons nécessaire pour se connecter ou s'inscrire sont présents.
   * Dans la première partie, on va sur la page d'accueil, puis on vérifie si le bouton de connexion est présent et on clique dessus.
   * Ensuite, on vérifie la présence de chaque champ (email, mdp, bouton connexion)
   * 
   * Dans la deuxième partie, on fait la même chose, mais avec le bouton inscription (vérification de présence + clic)
   * Et on regarde les champs présents (nom, prénom, email, mdp, confirmation mdp & bouton inscription)
   */

  it("On vérifie la présence du bouton connexion et la présence de tous les champs dans son formulaire", () => {
    cy.visit("/#/")
    cy.get("[data-cy='nav-link-login']").should("be.visible")
    .click()
    cy.get("[data-cy='login-input-username']").should("exist")
    cy.get("[data-cy='login-input-password']").should("exist")
    cy.get("[data-cy='login-submit']").should("be.visible")
    .and("be.enabled")
  })

  it("On vérifie la présence du bouton d'inscription et la présence de tous les champs dans son formulaire", () => {
    cy.visit("/#/")
    cy.get("[data-cy='nav-link-register']").should("be.visible").click()
    cy.get("[data-cy='register-input-lastname']").should("exist")
    cy.get("[data-cy='register-input-firstname']").should("exist")
    cy.get("[data-cy='register-input-email']").should("exist")
    cy.get("[data-cy='register-input-password']").should("exist")
    cy.get("[data-cy='register-input-password-confirm']").should("exist")
    cy.get("[data-cy='register-submit']").should("be.visible")
    .and("be.enabled")
  })
})