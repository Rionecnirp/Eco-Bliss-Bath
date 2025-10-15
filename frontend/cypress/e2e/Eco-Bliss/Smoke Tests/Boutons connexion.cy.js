describe("Smoke test - Page de connexion", () => {
  it("devrait afficher les champs et le bouton de connexion", () => {
    cy.visit("http://localhost:4200/#/");
    cy.get('[data-cy="nav-link-login"]').should("be.visible").click(); // Vérifier le bouton connexion et clic
    cy.get('[data-cy="login-input-username"]').should("exist"); // Vérifier le champ Email (username)
    cy.get('[data-cy="login-input-password"]').should("exist"); // Vérifier le champ mot de passe
    cy.get('[data-cy="login-submit"]').should("be.visible"); // Vérifier le bouton "Se connecter"

    cy.get('[data-cy="nav-link-register"]').should("be.visible").click(); // Vérifier le bouton "S'inscrire"
    cy.get('[data-cy="register-input-lastname"]').should("exist");
    cy.get('[data-cy="register-input-firstname"]').should("exist");
    cy.get('[data-cy="register-input-email"]').should("exist");
    cy.get('[data-cy="register-input-password"]').should("exist");
    cy.get('[data-cy="register-input-password-confirm"]').should("exist");
    cy.get('[data-cy="register-submit"]').should("be.visible");
  });
});