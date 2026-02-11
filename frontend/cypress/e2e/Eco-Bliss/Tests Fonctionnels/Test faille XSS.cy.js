describe("Tests API - Faille XSS", () => {

    /**Dans ce test, on vérifie s'il est possible d'exploiter les avis pour faire de l'injection de script.
     * Pour ce faire, on réutilise le code de l'envoi de commentaire, mais on place un morceau de code dans la section commentaire.
     * On place un marqueur dans le titre pour vérifier spécifiquement certains commentaires.
     * On essaie de regarder si l'envoi de l'avis est arrêté/interdit.
     * Puis, dans l'éventualité où l'avis est envoyé, on vérifie si le commentaire possède du code malveillant.
    */

    beforeEach(() => {
        cy.loginFront()
    })

    const marker = "10/05/2020"

    it("Ne doit exécuter aucun JavaScript injecté dans les commentaires", () => {
        const payload = `<script>window.__xss_executed = true;</script>`

        cy.loginBack().then((token) => {
            cy.request({
                method: "POST",
                url: `${Cypress.env("apiUrl")}/reviews`,
                failOnStatusCode: false,
                headers:
                    { Authorization: `Bearer ${token}`
                },
                body: {
                    rating: 5,
                    title: `XSS execution test ${marker}`,
                    comment: payload,
                },
            });
        });

        cy.visit("/#/reviews")
        cy.get('[data-cy="review-title"]')
        .contains(marker)
        cy.window().then((win) => {
            expect(win).not.to.have.property("__xss_executed")
        });
    })

    it("Ne doit pas accepter ni renvoyer de code HTML ou script brut", () => {

        
       const xssPayloads = [
        "<script>alert('XSS')</script>",
        "<img src=\"javascript:alert('XSS')\ onerror=alert('XSS') />",
        "<svg onload=alert('XSS')>",
        "<h1 style='color:red;'><u>test</u></h1>",
       ]

        cy.loginBack().then((token) => {

            cy.wrap(xssPayloads).each((payload) => {
                cy.request({
                    method: "POST",
                    url: `${Cypress.env("apiUrl")}/reviews`,
                    failOnStatusCode: false,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: {
                        rating: 5,
                        title: `Test faille XSS V2 ${marker}`,
                        comment: payload
                    }
                })

                .then((response) => {
                    
                    if ((response.status === 403)) {
                        expect(403).to.include(response.status)
                        return; 
                    }
                    expect(response.status).to.eq(200)

                    cy.visit("/#/reviews")
                    cy.get('[data-cy="review-title"]')
                    .filter(`:contains("${marker}")`)
                    .each(($title) => {
                        cy.wrap($title)
                        .parents('.single-review')
                        .find('[data-cy="review-comment"]')
                        .then(($comment) => {
                            const text = $comment.text()
                            const html = $comment.html()

                            expect(html).not.to.match(/<\s*script/i)
                            expect(html).not.to.match(/\son\w+\s*=/i)
                            expect(html).not.to.match(/javascript\s*:/i)
                            expect(html).not.to.match(/<\s*svg/i)
                            expect(html).not.to.match(/<\s*iframe/i)
                            expect(text).not.to.eq(payload)
                        })
                    })
                    
                    
                })
            })
        })
    })
})
