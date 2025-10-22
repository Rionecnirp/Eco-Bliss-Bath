
describe("Ajout au panier et vérification du stock", () => {
  
  /** Pour ce test, un commentaire sera placé avant chaque it pour spécifier ce dernier.
   * Avant cela et pour chaque it, on se connecte sur le Frontend et on se place sur la page "produits". 
  */

  beforeEach(() => {
    cy.loginFront()
    cy.visit("http://localhost:4200/#/products")
  })

  /** Ce "it" sert à vérifier que l'ajout de produit dans le panier diminue correctement le stock du produit.
   * On initie une variable initialStock pour stocker la valeur du stock de produit.
   * On clique spécifiquement sur le produit que l'on veut tester (ici "Poussière de lune").
   * Puis, on regarde le stock actuel du produit :
   * - En créant 2 variables qui servent à stocker le texte que l'on trouve dans "detail-product-stock" (rawText) et extraire juste le chiffre (match)
   * - On s'assure que l'on ne ressort pas une valeur null
   * - On transforme et stocke le résultat de match dans initialStock en nombres.
   * - Et on place une dernière mesure de sûreté en plaçant vérifiant que initialstock soit bien un nombre au dessus de zéro.
   * On clique sur le bouton d'ajout de produit et on s'assure d'être renvoyé au panier.
   * Ensuite on vérifie que le panier contient bien le produit ajouté.
   * Enfin on retourne sur la page du produit pour comparer le nouveau stock avec l'ancien stock.
   * Dernière étape : on vide le panier pour les prochains tests.
   */

  it("Ajoute un produit et vérifie la diminution du stock", () => {
    let initialStock

    cy.contains("[data-cy='product']", "Poussière de lune").within(() => {
      cy.get("[data-cy='product-link']").click()
    })      
    cy.get("[data-cy='detail-product-stock']").should(
      ($el) => {
        const rawText = $el.text()
        const match = rawText.match(/\d+/)
        expect(match, "Aucun chiffre trouvé dans le texte de stock").to.not.be
          .null
        initialStock = parseInt(match[0], 10)
        expect(initialStock).to.be.a("number").and.to.be.greaterThan(0)
      }
    )
    cy.get("[data-cy='detail-product-add']").click()    
    cy.url().should("include", "#/cart")
    cy.get("[data-cy='cart-line']").should("contain", "Poussière de lune")

    cy.go("back")
    cy.contains("[data-cy='detail-product-name']", "Poussière de lune").should(
      "be.visible"
    )
    cy.get("[data-cy='detail-product-stock']")
      .invoke("text")
      .then((updatedText) => {
        const match = updatedText.match(/\d+/)
        expect(match, "Aucun chiffre trouvé après ajout").to.not.be.null
        const updatedStock = parseInt(match[0], 10)
        expect(updatedStock).to.eq(initialStock - 1)
      })
    cy.cleanCart()
  })

  /** Ce "it" vérifie que l'ajout de quantité négative est impossible.
   * Pour cela, on vérifie avec la même fiche produit les mêmes informations.
   * On change la quantité achetée à -1.
   * Et on clique sur le bouton d'ajout de produit.
   * Si tout fonctionne correctement, rien n'a été ajouté au panier et on n'a pas changé de page.
   */

  it("Ne permet d’ajouter une quantité négative au panier", () => {
    cy.contains("[data-cy='product']", "Poussière de lune").within(() => {
      cy.get("[data-cy='product-link']").click()
    })
    cy.get("[data-cy='detail-product-quantity']").should("exist")
    cy.get("[data-cy='detail-product-quantity']").clear().type("-1")
    cy.get("[data-cy='detail-product-add']").click()
    cy.location("hash").should("not.include", "/cart")
    cy.get("[data-cy='detail-product-stock']").should("exist")
  })

  /** Ce "it" vérifie si l'ajout de 20+ produits d'un seul coup est possible.
   * Même approche que le premier test, sauf que l'on ajoute 21 produits.
   * On vérifie ensuite si le changement d'URL a lieu, si c'est le cas, alors on vérifie le panier.
   * On affiche la quantité de produits du panier dans le cy.log
   * Enfin, on nettoie le panier pour les futurs tests.
   */

  it("Vérifie s'il est possible d'ajouter plus de 20 produits", () => {
    cy.contains("[data-cy='product']", "Poussière de lune").within(() => {
      cy.get("[data-cy='product-link']").click()
    })
    cy.get("[data-cy='detail-product-quantity']").clear().type("21")
    cy.get("[data-cy='detail-product-add']").click()

    cy.location("hash").then((loc) => {
      if (loc.includes("/cart")) {
        cy.log("On est redirigé vers /cart, il est donc possible d'ajouter plus de 20 produits")
        cy.get("[data-cy='cart-line-quantity']").should("exist").invoke("val").then((val) => {
          const quantity = parseInt(val, 10)
          cy.log(`Quantité dans le panier : ${quantity}`)
        })
      } else {
        cy.log("Pas redirigé vers /cart")
      }
    })
    cy.cleanCart()
  })
})