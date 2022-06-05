describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast();
        cy.setToken();
    })

    it('Deve cadastrar um personagem', function () {
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

    context('Campos Obrigatorios', function () {
        const character = {
            name: 'Charless Xavier',
            age: 61,
            alias: 'Professor X',
            team: ['x-men', 'iluminatis'],
            active: true
        }

        const characterAux = {
            name: 'Charless Xavier',
            age: 61,
            alias: 'Professor X',
            team: ['x-men', 'iluminatis'],
            active: true
        }

        it('Nome Obrigatorio', function () {
            delete character.name
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.equal('\"name\" is required')
            })
        })

        it('Codinome Obrigatorio', function () {
            character.name = characterAux.name
            delete character.alias
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.equal('\"alias\" is required')
            })
        })

        it('Afiliações Obrigatorio', function () {
            character.alias = characterAux.alias
            delete character.team
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.equal('\"team\" is required')
            })
        })

        it('Status Obrigatorio', function () {
            character.team = characterAux.team
            delete character.active
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.equal('\"active\" is required')
            })
        })

    })

    context('Campos não obrigatorios', function () {
        const character = {
            name: 'Charless Xavier',
            age: 61,
            alias: 'Professor X',
            team: ['x-men', 'iluminatis'],
            active: true
        }

        it('Idade não obrigatorio', function () {
            delete character.age
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

    })

})
