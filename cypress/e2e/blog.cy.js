describe('Blog', () => {
  it('successfully loads', () => {
    cy.visit('/blog');
  });

  it('has content', () => {
    cy.visit('/blog');

    cy.get('nav[aria-label="Main"] a[aria-current="page"]').should('have.class', 'navbar__link--active');
    cy.get('main article').should('have.length.above', 1);
  });
});
