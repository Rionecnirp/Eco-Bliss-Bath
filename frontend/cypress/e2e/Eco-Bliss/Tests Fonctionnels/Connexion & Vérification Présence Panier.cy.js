/** Ce test sert à vérifier si toutes les actions qu'un utilisateur classique sont possibles selon un schéma.
 * Ici on cherche à savoir si un utilisateur connecté peut accéder à son panier.
 * On se connecte et on vérifie qu'on arrive bien sur la page d'accueil.
 * Puis on regarde les boutons présents (déconnexion et panier).
 * Pour bien faire, on s'assure que le bouton connexion n'existe pas.
 */

describe("Test fonctionnel - Connexion utilisateur", () => {
  it("devrait permettre de se connecter avec des identifiants valides", () => {

    cy.visit("http://localhost:4200");

    cy.get('[data-cy="nav-link-login"]').click();
    cy.url().should("include", "/login");

    cy.get('[data-cy="login-form"]').should("be.visible");
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
    cy.get('[data-cy="login-input-password"]').type("testtest");
    cy.get('[data-cy="login-submit"]').click();
    
    cy.url().should("not.include", "/login");
    cy.get('[data-cy="nav-link-logout"]').should("be.visible");
    cy.get('[data-cy="nav-link-login"]').should("not.exist");
    cy.get('[data-cy="nav-link-cart"]').should("be.visible");

    
  });
});
