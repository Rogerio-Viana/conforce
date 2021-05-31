describe('Remover Ingrediente', () => {
    it('remove', () => {
        cy.get('#tableIngredientes table  tbody tr').should('have.length', 1)
        cy.get('#tableIngredientes table  tbody tr .btnApagar').click()
        cy.get('#tableIngredientes table  tbody tr td').contains('Não há dados disponíveis')
    })
})