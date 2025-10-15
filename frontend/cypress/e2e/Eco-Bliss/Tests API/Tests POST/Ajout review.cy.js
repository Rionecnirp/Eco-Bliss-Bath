describe('Tests API - POST /reviews', () => {

    it('devrait permettre d’ajouter un avis sur un produit', () => {

        cy.login().then((token) => {

            const review = {
                rating: 4,
                title: 'Bon achat',
                comment: 'Super produit, je recommande !', 
            }

            cy.request({
                method: 'POST',
                url: 'http://localhost:8081/reviews',
                failOnStatusCode: false,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: review,
            }).then((response) => {

                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.deep.include({
                    title: review.title,
                    comment:review.comment,
                    rating:review.rating
                })
                
                cy.log('Avis ajouté :', JSON.stringify(response.body));
            });

        });

    });

});
