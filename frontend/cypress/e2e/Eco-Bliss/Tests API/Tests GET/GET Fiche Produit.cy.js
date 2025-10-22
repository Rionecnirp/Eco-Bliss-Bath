describe("Tests API - GET /products/{id}", () => {

    /** Dans ce test, on choisit un produit dont on doit renvoyer sa fiche produit.
     * On fait une requête au Backend, puis on vérifie que les informations du produit existent bien.
     */

    it("devrait retourner la fiche complète d'un produit spécifique", () => {

        const productId = 3;

        cy.request({
            method: "GET",
            url: `http://localhost:8081/products/${productId}`,
        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("id", productId);
            expect(response.body).to.have.property("name");
            expect(response.body).to.have.property("description");
            expect(response.body).to.have.property("price");
            expect(response.body).to.have.property("picture");

            cy.log("Fiche produit :", JSON.stringify(response.body));
        });
    });
});
