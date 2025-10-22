describe("Test API - GET Ajout d'un produit dans le panier, puis vérification qu'il est bien présent", () => {

    /** Dans ce test, on envoie une requête de la liste des produits dans le panier.
     * En premier temps, on se connecte côté front pour pouvoir ajouter un produit dans le panier.
     * On sélectionne le produit (ici Chuchotements d'été) et on clique sur le bouton pour ajouter au panier.
     * Puis dans un second temps, on se connecte côté backend, puis on fait la requête pour pouvoir voir le panier.
     * On s'assure que toutes les propriétés du produit sont présentes.
     */

    it("Ajout d'un produit côté Frontend, puis vérification du panier côté Backend", () => {
        cy.loginFront()
        cy.visit("http://localhost:4200/#/products")
        cy.contains("[data-cy='product']", "Chuchotements d'été").within(() => {
            cy.get("[data-cy='product-link']").click()
        })  
        cy.get("[data-cy='detail-product-add']").click()
        cy.get("[data-cy='detail-product-add']").click()
        /**Ce n'est pas une erreur, c'est une solution de fortune.
         * Parfois, le premier clic n'est pas perçu et cela fait échouer le test.
         * Faire une requête PUT permettrait d'éviter tout cela et est probablement la solution.
         */
        cy.visit("http://localhost:4200/#/cart")
        cy.get("[data-cy='cart-line']")

        cy.loginBack().then((token) => {
            cy.request({
                method:"GET",
                url: "http://localhost:8081/orders",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                expect(response.body).to.have.property("orderLines");
                expect(response.body.orderLines).to.be.an("array");

                response.body.orderLines.forEach((orderLine) => {
                    expect(orderLine).to.have.property("id");
                    expect(orderLine).to.have.property("quantity");
                    expect(orderLine).to.have.property("product");

                    const product = orderLine.product;
                    expect(product).to.have.property("id");
                    expect(product).to.have.property("name");
                    expect(product).to.have.property("description");
                    expect(product).to.have.property("price");
                    expect(product).to.have.property("picture");
                })
                cy.log("Produits dans le panier :", JSON.stringify(response.body.orderLines));
            })
        })
        cy.cleanCart()
    })
})