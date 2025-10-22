describe("TEST API - GET /orders quand non connecté", () => {

  /** Dans ce test, on vérifie que nous n'avons pas accès au panier de l'utilisateur, car nous ne sommes pas connectés.
   * On s'assure de ne pas être connecté en vérifiant que le bouton "connexion" existe.
   * Puis on essaie une requête pour récupérer le panier.
   * Si cela échoue parce qu'on n'est pas connecté, on est bon.
   */
  
  it("Doit retourner 401 si l'utilisateur n'est pas connecté", () => {
    cy.visit("http://localhost:4200/#/")
    cy.get("[data-cy='nav-link-login']").should("be.visible")
    cy.request({
        method: "GET",
        url: "http://localhost:8081/orders",
        failOnStatusCode: false,
    })
    .then((response) => {
        expect([401]).to.include(response.status)

        cy.log("Réponse reçue :", JSON.stringify(response.body))
    })
  })
})