describe('Editar Lanche', () => {
    it('edit', () => {
        cy.get('#tableLanches table  tbody tr').should('have.length', 1)
        cy.get('#tableLanches table  tbody tr .btnEditar').click()
        cy.get('#inputName').clear().type('Lanche Editado 1')
        cy.get('#btnSalvarLanche').click()
        cy.get('#tableLanches table  tbody tr td:first-child').contains('Lanche Editado 1')
    })
})