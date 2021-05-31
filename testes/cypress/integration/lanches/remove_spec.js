describe('Remover Lanche', () => {
    it('remove', () => {
        cy.get('#tableLanches table  tbody tr').should('have.length', 1)
        cy.get('#tableLanches table  tbody tr .btnApagar').click()
        cy.get('#tableLanches table  tbody tr td').contains('Não há dados disponíveis')
    })
})