describe("Tests API - POST /orders/add", () => {

    /**Dans ce test, on tente d'ajouter via la requête POST un produit dans le panier.
     * Cependant, une requête PUT est utilisée à la place, ce qui fait que le test échoue systématiquement.
     * L'échec du test prouve la présence d'une erreur.
     */
    
  it("Devrait ajouter un produit disponible au panier", () => {

    cy.loginBack().then((token) => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/orders/add`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                productId: 1,
                quantity: 1,
            },
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("message")
            cy.log("Réponse :", JSON.stringify(response.body))
        })
    })
    
  })
})
