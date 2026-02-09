describe("Tests API - POST /orders/add", () => {

    /**Dans ce test, on tente d'ajouter un produit dans le panier.
     * Dans le compte rendu des tests manuels de Marie, elle spécifie que les produits sont ajoutés dans le panier via une requête PUT.
     * Ces deux tests, utilisant POST et PUT devraient permettre de confirmer cette affirmation.
     */
    
  it("Ajout d'un produit au panier en utilisant POST", () => {

    cy.loginBack().then((token) => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/orders/add`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                product: 4,
                quantity: 1,
            },
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            cy.log("Réponse :", JSON.stringify(response.body))
        })
    })
    
  })

  it("Ajout d'un produit au panier en utilisant PUT", () => {

    cy.loginBack().then((token) => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env("apiUrl")}/orders/add`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                product: 4,
                quantity: 1,
            },
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            cy.log("Réponse :", JSON.stringify(response.body))
        })
    })
    
  })
})
