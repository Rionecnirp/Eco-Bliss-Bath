describe('Tests API - POST /login', () => {

  it('devrait renvoyer 401 pour un utilisateur inconnu', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      failOnStatusCode: false,
      body: {
        username: 'inconnu@test.com',
        password: 'mauvaisMotDePasse',
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      cy.log('Réponse :', JSON.stringify(response.body));
    });
  });

  it('devrait renvoyer 200 et un token pour un utilisateur connu', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      
      expect(response.body).to.have.property('token');
      cy.log('Token reçu :', response.body.token);

      
      Cypress.env('token', response.body.token);
    });
  });
});