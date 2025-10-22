describe("Tests API - POST /login", () => {

  /** Dans ce test, on vérifie ce qui se passe quand l'utilisateur tente de se connecter avec un mauvais identifiant.
   * Puis, on regarde ce qui se passe quand l'utilisateur tente de se connecter avec les bons identifiants.
   * Deux requêtes POST font effectuées et on s'assure d'avoir le résultat attendu pour chaque (échec pour les mauvais identifiants, réussite pour les bons identifiants).
   */

  it("Renvoie une erreur 401 pour un utilisateur inconnu", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      failOnStatusCode: false,
      body: {
        username: "inconnu@test.com",
        password: "mauvaisMotDePasse",
      },
    }).then((response) => {
      expect(response.status).to.eq(401)
      cy.log("Réponse :", JSON.stringify(response.body))
    })
  })

  it("Renvoie une réponse 200 et un token pour un utilisateur connu", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("token")
      cy.log("Token reçu :", response.body.token)
    })
  })
})