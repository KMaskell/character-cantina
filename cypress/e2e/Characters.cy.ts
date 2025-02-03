describe('Characters Homepage', () => {
  beforeEach(() => {
    cy.fixture('people-1-limit-10.json').as('peoplePage1');
    cy.fixture('people-2-limit-10.json').as('peoplePage2');
  });

  it('loads the Character homepage correctly with mock data', () => {
    cy.get('@peoplePage1').then((peoplePage1) => {
      cy.intercept('GET', 'https://swapi.dev/api/people/?page=1&limit=10', {
        statusCode: 200,
        body: peoplePage1,
      }).as('getCharacters');
    });

    cy.visit('/');
    cy.wait('@getCharacters');

    cy.contains('Characters').should('be.visible');
    cy.contains('Luke Skywalker').should('be.visible');
    cy.contains('Darth Vader').should('be.visible');
  });

  it('displays a loading spinner while loading the characters data', () => {
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1&limit=10', {
      delayMs: 1000,
      statusCode: 200,
      body: { count: 2, next: null, previous: null, results: [] },
    }).as('getCharactersLoading');

    cy.visit('/');
    cy.contains('Loading characters...').should('be.visible');
    cy.get('[data-testid="loading-spinner"]').should('be.visible');
  });

  it('displays the error message when the API request fails', () => {
    cy.intercept('GET', 'https://swapi.dev/api/people/?page=1&limit=10', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('getCharactersError');

    cy.visit('/');
    cy.wait('@getCharactersError');
    cy.contains('Failed to load characters. Please refresh and try again.').should('be.visible');
  });

  it('filters characters with input in the search field', () => {
    cy.get('@peoplePage1').then((peoplePage1) => {
      cy.intercept('GET', 'https://swapi.dev/api/people/?page=1&limit=10', {
        statusCode: 200,
        body: peoplePage1,
      }).as('getCharacters');
    });

    cy.visit('/');
    cy.wait('@getCharacters');

    cy.get('input[placeholder="Search characters..."]').type('Luke');

    cy.contains('Luke Skywalker').should('be.visible');
    cy.contains('Leia Organa').should('not.exist');
    cy.contains('Darth Vader').should('not.exist');
  });

  it('paginates through the characters', () => {
    cy.get('@peoplePage1').then((peoplePage1) => {
      cy.intercept('GET', 'https://swapi.dev/api/people/?page=1&limit=10', {
        statusCode: 200,
        body: peoplePage1,
      }).as('getPage1');
    });

    cy.get('@peoplePage2').then((peoplePage2) => {
      cy.intercept('GET', 'https://swapi.dev/api/people/?page=2&limit=10', {
        statusCode: 200,
        body: peoplePage2,
      }).as('getPage2');
    });

    cy.visit('/');
    cy.wait('@getPage1');

    cy.contains('Luke Skywalker').should('be.visible');
    cy.contains('Leia Organa').should('be.visible');

    cy.contains('Prev').should('be.disabled');

    cy.contains('Next').click();
    cy.wait('@getPage2');

    cy.contains('Anakin Skywalker').should('be.visible');
    cy.contains('Luke Skywalker').should('not.exist');

    cy.contains('Prev').should('not.be.disabled');
  });
});



