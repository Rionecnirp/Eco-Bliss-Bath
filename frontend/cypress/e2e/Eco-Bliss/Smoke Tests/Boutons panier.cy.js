describe("Smoke Test - Boutons Ajouter au panier sur chaque produit", () => {

  /** Dans ce test, on vérifie pour chaque produit la présence du bouton "Ajouter au panier".
   * On récupère le bouton pour consulter tous les produits.
   * Puis pour chaque bouton :
   * - on clique dessus.
   * - on vérifie la présence du bouton "Ajouter au panier". 
   * - on retourne à la plage précédente.
   */

  it("On vérifie la présence du bouton 'Ajouter au panier' pour chaque produit présent", () => {
    cy.loginFront()
    cy.visit("http://localhost:4200/#/products")
    
    cy.get("[data-cy='product-link']").each(($productLink, index) => {
      cy.log(`Test du produit n°${index + 1}`)
      cy.get("[data-cy='product-link']").eq(index).click()
      cy.get("[data-cy='detail-product-add']").should("be.visible") 
      cy.go("back") 
    })
  })
})
