describe('Editar Ingrediente', () => {
    it('edit', () => {
        cy.get('#tableIngredientes table  tbody tr').should('have.length', 1)
        cy.get('#tableIngredientes table  tbody tr .btnEditar').click()
        cy.get('#inputName').clear().type('Ingrediente Editado 1')
        cy.get('#inputValue').clear().type('1000')
        cy.get('#btnSalvarIngrediente').click()
        cy.get('#tableIngredientes table  tbody tr td:first-child').contains('Ingrediente Editado 1')
    })
})