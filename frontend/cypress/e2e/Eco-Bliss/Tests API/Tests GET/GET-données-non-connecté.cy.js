describe('Vérification des accès non autorisés à /orders', () => {
  it("Doit retourner 401 si l'utilisateur n'est pas connecté", () => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        failOnStatusCode: false,
    })
    .then((response) => {
        expect([401, 403]).to.include(response.status);

        cy.log('Réponse reçue :', JSON.stringify(response.body))
    });
  });
});