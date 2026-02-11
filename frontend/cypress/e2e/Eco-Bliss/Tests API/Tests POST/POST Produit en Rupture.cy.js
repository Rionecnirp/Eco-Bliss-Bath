describe("Tests API - POST /orders/add", () => {

    /**Dans ce test, on tente d'ajouter via la requête POST un produit dans le panier alors qu'il est en rupture de stock.
     * Cependant, une requête PUT est utilisée à la place, ce qui fait que le test échoue systématiquement.
     * Donc pour vérifier cela, on fait deux tests :
     * Le premier avec la méthode POST, pour vérifier si le produit est ajouté.
     * Le second avec la méthode PUT et on vérifie la même chose.
     */

    it("Requête POST - Renvoie une erreur si le produit est en rupture de stock", () => {
        cy.loginBack().then((token) => {
            cy.request({
                method: "POST",
                url: `${Cypress.env("apiUrl")}/orders/add`,
                failOnStatusCode: false,
                headers: {
                Authorization: `Bearer ${token}`,
                },
                body: {
                product: 3,
                quantity: 1,
                },
            })
            .then((response) => {
                expect(response.status).to.not.eq(200)
                cy.log("Réponse :", JSON.stringify(response.body))
            })
        })
    })

    it("Requête PUT - Renvoie une erreur si le produit est en rupture de stock", () => {
        cy.loginBack().then((token) => {
            cy.request({
                method: "PUT",
                url: `${Cypress.env("apiUrl")}/orders/add`,
                failOnStatusCode: false,
                headers: {
                Authorization: `Bearer ${token}`,
                },
                body: {
                product: 3,
                quantity: 1,
                },
            })
            .then((response) => {
                expect(response.status).to.not.eq(200)
                cy.log("Réponse :", JSON.stringify(response.body))
            })
        })
    })
})