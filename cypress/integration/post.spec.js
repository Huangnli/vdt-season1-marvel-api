describe('POST /characters', function(){

    before(function(){
        cy.back2ThePast();
        cy.setToken();
    })

    it('deve cadastrar um personagem', function(){

        // const character = {
        //     name: 'Charless Xavier',
        //     alias: 'Professor X',
        //     team: ['x-men', 'iluminatis'],
        //     active: true
        // }
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.api({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token') //Obtendo o valor
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
        })
    })
})