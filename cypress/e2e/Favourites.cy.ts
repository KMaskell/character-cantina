it('adds character to favourites, navigates to favourites page, and removes from favourites', () => {
  cy.fixture('people-1-limit-10.json').as('peoplePage1');
  cy.fixture('people-2-limit-10.json').as('peoplePage2');
  cy.fixture('anakin-skywalker/details.json').as('details');
  cy.fixture('anakin-skywalker/homeworld.json').as('homeworld');

  // Intercept the people API and return mock data for both pages
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

  // Intercept the character details API for Anakin Skywalker
  cy.get('@details').then((details) => {
    cy.intercept('GET', '**/api/people/11/', {
      statusCode: 200,
      body: details,
    }).as('getCharacterDetails');
  });

  // Intercept homeworld API and return mock data
  cy.get('@homeworld').then((homeworld) => {
    cy.intercept('GET', 'https://swapi.dev/api/planets/1/', {
      statusCode: 200,
      body: homeworld,
    }).as('getHomeworld');
  });

  // Visit characters homepage and wait for characters to load
  cy.visit('/');
  cy.wait('@getPage1');

  // Click the "Next" button to load page 2 (for Anakin Skywalker)
  cy.contains('Next').click();
  cy.wait('@getPage2');

  // Click on Anakin Skywalker in the table
  cy.get('[data-testid="Anakin Skywalker"]').click();

  // Wait for Anakin's details to load
  cy.wait('@getCharacterDetails');
  cy.wait('@getHomeworld');

  // Add character to favourites
  cy.contains('button', 'Add to Favourites').should('be.visible').click();

  // Go to Favourites page
  cy.contains('button', 'Go to Favourites').should('be.visible').click();

  // Assert we're on the favourites page
  cy.url().should('include', '/favourites');

  // Assert ANakin is there on the favourites page
  cy.contains('Anakin Skywalker').should('be.visible');
  cy.contains('Gender: Male').should('be.visible');
  cy.contains(`Height: 6'2" (188cm)`).should('be.visible');
  cy.contains('Tatooine').should('be.visible');

  // Assert the "Remove from Favourites" button is visible and click it
  cy.contains('button', 'Remove from Favourites').should('be.visible').click();

  // Assert that after removing, we see "No favourites added yet"
  cy.contains('Anakin Skywalker').should('not.exist');
  cy.contains('No favourites added yet').should('be.visible');
});


