describe("Tests API - POST /reviews", () => {

    /** Dans ce test, on fait une requête POST pour envoyer un avis et voir si cela fonctionne.
     * On s'assure que, si l'envoi est une réussite, que l'avis possède un id et les éléments demandés (titre, commentaire et note)
     */

    it("devrait permettre d’ajouter un avis sur un produit", () => {

        cy.loginBack().then((token) => {

            const review = {
                rating: 4,
                title: "Bon achat",
                comment: "Super produit, je recommande !", 
            }

            cy.request({
                method: "POST",
                url: "http://localhost:8081/reviews",
                failOnStatusCode: false,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: review,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property("id")
                expect(response.body).to.deep.include({
                    title: review.title,
                    comment:review.comment,
                    rating:review.rating
                })
                
                cy.log("Avis ajouté :", JSON.stringify(response.body))
            })
        })
    })
})
