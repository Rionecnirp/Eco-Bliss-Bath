describe("Smoke Test - Boutons Ajouter au panier sur chaque produit", () => {
  it("devrait afficher le bouton sur chaque produit", () => {

    
    cy.login();

    
    cy.visit('http://localhost:4200/#/products');

    cy.get('[data-cy="product-link"]').should("have.length.at.least", 1); 

    
    cy.get('[data-cy="product-link"]').each(($productLink, index, $list) => {
      cy.log(`Test du produit n°${index + 1}`);
      
      cy.get('[data-cy="product-link"]').eq(index).click();
      cy.get('[data-cy="detail-product-add"]').should("be.visible"); 

      cy.go("back"); 

      cy.get('[data-cy="product-link"]').should("have.length", $list.length);
    });
  });
});
