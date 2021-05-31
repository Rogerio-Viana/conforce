import "cypress-localstorage-commands"

describe('Adicionar Lanche', () => {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('visit Ingredientes', () => {
        cy.visit('http://localhost:8080/ingredientes')
    })

    for (let i = 1; i <= 3; i++) {

        it(`add Ingrediente ${i}`, () => {
            cy.get('#btnNovoIngrediente').click()
            cy.get('#inputName').clear().type(`Ingrediente ${i}`)
            cy.get('#inputValue').clear().type(`${i}0`)
            cy.get('#btnSalvarIngrediente').click()
        })
    }

    it('add Lanche', () => {
        cy.visit('http://localhost:8080/lanches')
        cy.get('#btnNovoLanche').click()
        cy.get('#inputName').type('Lanche 1')
        cy.get('.select-ingredientes div.v-select div[aria-haspopup=listbox]').click()
        cy.get('.v-list-item.v-list-item--link').click({ multiple: true })
        cy.get('#inputName').click()
        cy.get('#btnSalvarLanche').click()
        cy.get('#tableLanches table  tbody tr').should('have.length', 1)
    })
})