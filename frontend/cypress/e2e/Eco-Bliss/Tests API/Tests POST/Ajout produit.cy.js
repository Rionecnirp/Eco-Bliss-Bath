describe('Tests API - POST /orders/add', () => {

  it('devrait ajouter un produit disponible au panier', () => {

    cy.login().then((token) => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/orders/add',
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
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message');
            cy.log('Réponse :', JSON.stringify(response.body));
        });
    })
    
  });
});
