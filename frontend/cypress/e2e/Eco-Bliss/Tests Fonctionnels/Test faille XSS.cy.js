describe("Tests API - Faille XSS", () => {

    /**Dans ce test, on vérifie s'il est possible d'exploiter les avis pour faire de l'injection de script.
     * Pour ce faire, on réutilise le code de l'envoi d'avis, mais on place un morceau de code dans la section commentaire.
     * On essaie de regarder si l'envoi de l'avis est arrêté/interdit.
     * Puis, dans l'éventualité où l'avis est envoyé, on vérifie si le morceau de code n'est pas présent.
    */

    it("Ne doit pas accepter ni renvoyer de code HTML ou script brut", () => {

        cy.loginBack().then((token) => {

            const review = {
                rating: 3,
                title: "Test faille XSS",
                comment: "<script>alert('XSS')</script>", 
            }

            cy.request({
                method: "POST",
                url: "http://localhost:8081/reviews",
                failOnStatusCode: false,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: review,
            }).then((response) => {
                cy.log("Réponse :", JSON.stringify(response.body))

                if ([400, 403].includes(response.status)) {
                    expect([400, 403].toLocaleString.include(response.status))
                }

                else if (response.status === 200) {
                    expect(response.body.comment).to.not.include("<script>")
                    expect(response.body.comment).to.not.include("</script>")
                }
            })
        })
    })
})
