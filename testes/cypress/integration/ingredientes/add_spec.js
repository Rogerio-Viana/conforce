describe('Adicionar Ingrediente', () => {
    it('add', () => {
        cy.visit('http://localhost:8080/ingredientes')
        cy.get('#btnNovoIngrediente').click()
        cy.get('#inputName').type('Ingrediente 1')
        cy.get('#inputValue').type('10')
        cy.get('#btnSalvarIngrediente').click()
        cy.get('#tableIngredientes table  tbody tr').should('have.length', 1)
    })
})