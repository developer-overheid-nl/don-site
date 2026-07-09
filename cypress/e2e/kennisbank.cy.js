describe('Kennisbank', () => {
  it('successfully loads', () => {
    cy.visit('/kennisbank');
  });

  it('has content', () => {
    cy.visit('/kennisbank');

    cy.get('main h1').should('have.text', 'Kennisbank');
    cy.contains(/Er zijn op dit moment \d+ artikelen in onze Kennisbank./);
  });

  it('has custom icons', () => {
    cy.visit('/kennisbank');

    cy.get('[data-icon-name="lade-archiefkast"]').should('exist');
  });
});
