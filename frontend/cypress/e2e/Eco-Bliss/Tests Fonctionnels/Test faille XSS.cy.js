describe("Tests API - Faille XSS", () => {

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

                else {
                throw new Error(`Réponse inattendue : ${response.status}`)
                }
            })

        })

    })

})
