describe('Search', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://search.developer.overheid.nl/multi_search*', {fixture: 'multi_search.json'}).as('getMultiSearch');
  })

  it('is accessible from the Hompeage', () => {
    cy.visit('/');

    cy.get('form[action="/zoeken"]').as('searchForm');

    cy.get('@searchForm').find('[name="q"]')
      .should('be.visible').and('have.attr', 'type', 'search')
      .type('api');

    cy.get('@searchForm').find('[type=submit]')
      .should('contain', 'Zoeken')
      .click();

    cy.location('pathname').should('match', /\/zoeken$/);
    cy.location('search').should('match', /q=api/);

    cy.wait(['@getMultiSearch']);
    cy.contains(/\d+ documenten gevonden/).should('exist');
    cy.get('main section').then((sections) => {
      expect(sections).to.contain.text('Standaarden');
      expect(sections).to.contain.text('API-register');
      expect(sections).to.contain.text('Open source register');
      expect(sections).to.contain.text('Blog');
    });
  });
});
