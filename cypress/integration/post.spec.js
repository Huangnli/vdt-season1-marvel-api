describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast();
        cy.setToken();
    })

    it('Deve cadastrar um personagem', function () {

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

        cy.postCharacter(character).then(function (response) {
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.equal(24)
        })

    })

    context('Quando personagem já existe', function () {
        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('Nâo deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })

    })

})
