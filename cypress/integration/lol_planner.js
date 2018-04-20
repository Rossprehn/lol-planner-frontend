describe('lol-planner', function() {
  it('works', function() {
    cy.visit('http://localhost:8080')
    cy.get('h1').should('have.text', 'league of legends')
    cy.get('p.App-header').should('have.text', 'teamwork makes legends of us all')
    cy.get('h3.OVERVIEW').should('have.text', 'OVERVIEW')
    cy.get('h3.REQUIREMENTS').should('have.text', 'REQUIREMENTS')
    cy.get('h3.GAMEPLAY').should('have.text', 'GAMEPLAY')
    cy.get('h3.ADDITIONAL').should('have.text', 'ADDITIONAL FEATURES')
    cy.get('h3.ADDITIONAL').should('have.text', 'ADDITIONAL FEATURES')
    cy
      .get('.splash-buttons .plus-sign ')
      .should('have.text', '+')
      .click()
    cy
      .get('.button-container .play-button ')
      .should('have.text', 'PLAY')
      .click()
  })
})
