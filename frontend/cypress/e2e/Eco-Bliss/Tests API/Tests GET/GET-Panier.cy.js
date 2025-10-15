describe('Test API - Get /orders', () => {
    it('devrait retourner la liste des produits dans le panier', () => {

        cy.login().then((token) => {
            cy.request({
                method:'GET',
                url: 'http://localhost:8081/orders',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                
                expect(response.body).to.have.property('orderLines');
                expect(response.body.orderLines).to.be.an('array');

                response.body.orderLines.forEach((orderLine) => {
                    expect(orderLine).to.have.property('id');
                    expect(orderLine).to.have.property('quantity');
                    expect(orderLine).to.have.property('product');

                    const product = orderLine.product;
                    expect(product).to.have.property('id');
                    expect(product).to.have.property('name');
                    expect(product).to.have.property('description');
                    expect(product).to.have.property('price');
                    expect(product).to.have.property('picture');
                })
                cy.log('Produits dans le panier :', JSON.stringify(response.body));
            })
        })

        
    })
})