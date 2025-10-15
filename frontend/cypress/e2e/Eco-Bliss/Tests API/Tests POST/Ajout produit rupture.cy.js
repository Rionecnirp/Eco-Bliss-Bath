describe('Tests API - POST /orders/add', () => {

    it('devrait renvoyer une erreur si le produit est en rupture de stock', () => {
        cy.login().then((token) => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:8081/orders/add',
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
                expect([400, 409]).to.include(response.status);
                cy.log('Réponse :', JSON.stringify(response.body));
            });
        })
    });
});