describe("Tests API - POST /orders/add", () => {

    /**Dans ce test, on tente d'ajouter via la requête POST un produit dans le panier alors qu'il est en rupture de stock.
     * Cependant, une requête PUT est utilisée à la place, ce qui fait que le test échoue systématiquement.
     * L'échec du test prouve la présence d'une erreur.
     * De plus, même si l'on venait à utiliser une requête PUT, le test n'aurait pas l'effet souhaité.
     * PUT mettra un objet dans le panier, quel que soit l'état du stock.
     */

    it("Devrait renvoyer une erreur si le produit est en rupture de stock", () => {
        cy.loginBack().then((token) => {
            cy.request({
                method: "POST",
                url: `${Cypress.env("apiUrl")}/orders/add`,
                failOnStatusCode: false,
                headers: {
                Authorization: `Bearer ${token}`,
                },
                body: {
                productId: 0,
                quantity: 1,
                },
            })
            .then((response) => {
                expect([409]).to.include(response.status)
                cy.log("Réponse :", JSON.stringify(response.body))
            })
        })
    })
})