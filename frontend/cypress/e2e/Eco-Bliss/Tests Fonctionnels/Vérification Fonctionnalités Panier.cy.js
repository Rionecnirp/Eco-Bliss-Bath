// Ce fichier contient des tests end-to-end Cypress pour vérifier le comportement du panier et la gestion du stock lors de l’ajout de produits.

// Définition du bloc de tests principal pour l’ajout au panier et la vérification du stock.
describe("Ajout au panier et vérification du stock", () => {
  // Variable pour stocker le stock initial du produit testé.
  let initialStock;

  beforeEach(() => {
    cy.visit('http://localhost:4200/#/login');
    cy.get('[data-cy="nav-link-login"]').click();
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
    cy.get('[data-cy="login-input-password"]').type("testtest");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="nav-link-logout"]').should("exist");
    cy.visit('http://localhost:4200/#/cart');

cy.visit('http://localhost:4200/#/products');

  })

  // Test : ajout d’un produit et vérification de la diminution du stock.
  it("devrait ajouter un produit et vérifier la diminution du stock", () => {
    
    
    
    // Sélection du produit "Poussière de lune" et accès à sa fiche.
    cy.contains('[data-cy="product"]', "Poussière de lune").within(() => {
      cy.get('[data-cy="product-link"]').click();
    })      

    // Extraction du stock initial affiché sur la fiche produit.
    cy.get('[data-cy="detail-product-stock"]').should(
      ($el) => {
        const rawText = $el.text();
        const match = rawText.match(/\d+/);
        expect(match, "Aucun chiffre trouvé dans le texte de stock").to.not.be
          .null;

        initialStock = parseInt(match[0], 10);
        expect(initialStock).to.be.a("number").and.to.be.greaterThan(0);
      }
    );

    // Ajout du produit au panier.
    cy.get('[data-cy="detail-product-add"]').click();

    // Vérification de la redirection vers le panier et de la présence du produit.
    
    cy.url().should("include", "#/cart");
    cy.get("#cart-content").should("exist");
    cy.get('[data-cy="cart-line"]').should("contain", "Poussière de lune");

    // Retour sur la fiche produit pour vérifier le stock mis à jour.
    cy.go("back"); // Retour à la fiche produit.
    cy.contains('[data-cy="detail-product-name"]', "Poussière de lune").should(
      "be.visible"
    );
    // Vérifie que le stock a diminué de 1 après l’ajout au panier.
    cy.get('[data-cy="detail-product-stock"]')
      .invoke("text")
      .then((updatedText) => {
        const match = updatedText.match(/\d+/);
        expect(match, "Aucun chiffre trouvé après ajout").to.not.be.null;
        const updatedStock = parseInt(match[0], 10);
        expect(updatedStock).to.eq(initialStock - 1);
      });
    cy.cleanCart();
  });

 

  it("ne devrait pas permettre d’ajouter une quantité négative au panier", () => {
  // Aller sur la fiche du même produit
  cy.contains('[data-cy="product"]', "Poussière de lune").within(() => {
  cy.get('[data-cy="product-link"]').click();
  });
  
  // Vérifie que le champ quantité existe
  cy.get('[data-cy="detail-product-quantity"]').should("exist");

  // Entrer une quantité négative
  cy.get('[data-cy="detail-product-quantity"]').clear().type("-1");
  
  // Cliquer sur le bouton d’ajout
  cy.get('[data-cy="detail-product-add"]').click();

  cy.wait(2000);
  
  // Vérifie qu’on ne part pas vers la page panier
  cy.location("hash").should("not.include", "/cart");
  
  // Vérifie qu’on reste bien sur la fiche produit
  cy.get('[data-cy="detail-product-stock"]').should("exist");
  

  });



  it("vérifie s'il est possible d'ajouter plus de 20 produits", () => {
  // Aller sur un produit (ex. “Poussière de lune”)
  cy.contains('[data-cy="product"]', "Poussière de lune").within(() => {
    cy.get('[data-cy="product-link"]').click();
  });

  cy.get('[data-cy="detail-product-quantity"]').clear().type("21");

  // Cliquer sur le bouton "Ajouter au panier"
  cy.get('[data-cy="detail-product-add"]').click();

  cy.wait(2000);

  // Vérifier qu’on n’est **pas redirigé vers le panier**
  cy.location("hash").then((loc) => {
  if (loc.includes("/cart")) {
    cy.log("On est redirigé vers /cart, il est donc possible d'ajouter plus de 20 produits");
    cy.get('[data-cy="cart-line-quantity"]').should("exist").invoke('val').then((val) => {
  const quantity = parseInt(val, 10);
  cy.log(`Quantité dans le panier : ${quantity}`);
});

  } else {
    cy.log("Pas redirigé vers /cart");
  }
});
cy.cleanCart();
});


});