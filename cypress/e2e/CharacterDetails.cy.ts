it('adds character to favourites, navigates to favourites page, and removes from favourites', () => {
  cy.fixture('people-1-limit-10.json').as('peoplePage1');
  cy.fixture('people-2-limit-10.json').as('peoplePage2');
  cy.fixture('anakin-skywalker/details.json').as('details');
  cy.fixture('anakin-skywalker/homeworld.json').as('homeworld');
  cy.fixture('anakin-skywalker/films.json').as('films');
  cy.fixture('anakin-skywalker/starships.json').as('starships');

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
    cy.intercept('GET', 'https://swapi.dev/api/people/11/', {
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

  // Intercept films API with titles from films fixture
  cy.get('@films').then((films) => {
    cy.intercept('GET', 'https://swapi.dev/api/films/4/', {
      statusCode: 200,
      body: { title: films[0] },
    }).as('getFilm4');

    cy.intercept('GET', 'https://swapi.dev/api/films/5/', {
      statusCode: 200,
      body: { title: films[1] }, 
    }).as('getFilm5');

    cy.intercept('GET', 'https://swapi.dev/api/films/6/', {
      statusCode: 200,
      body: { title: films[2] },
    }).as('getFilm6');
  });

  // Intercept starships API with names from starships fixture
  cy.get('@starships').then((starships) => {
    cy.intercept('GET', 'https://swapi.dev/api/starships/39/', {
      statusCode: 200,
      body: { name: starships[0] },
    }).as('getStarship39');

    cy.intercept('GET', 'https://swapi.dev/api/starships/59/', {
      statusCode: 200,
      body: { name: starships[1] },
    }).as('getStarship59');

    cy.intercept('GET', 'https://swapi.dev/api/starships/65/', {
      statusCode: 200,
      body: { name: starships[2] },
    }).as('getStarship65');
  });

  // Visit homepage and wait for page 1 to load
  cy.visit('/');
  cy.wait('@getPage1');

  // Click the "Next" button to load page 2 (for Anakin Skywalker)
  cy.contains('Next').click();

  cy.wait('@getPage2');

  // Click on Anakin Skywalker in the table
  cy.get('[data-testid="Anakin Skywalker"]').click();

  cy.wait('@getCharacterDetails');
  cy.wait('@getHomeworld');

  // Wait for each film request
  cy.wait('@getFilm4');
  cy.wait('@getFilm5');
  cy.wait('@getFilm6');

  // Wait for each starship request
  cy.wait('@getStarship39');
  cy.wait('@getStarship59');
  cy.wait('@getStarship65');

  // character details
  cy.contains('Anakin Skywalker').should('be.visible');
  cy.contains('Hair Colour: Blond').should('be.visible');
  cy.contains('Eye Colour: Blue').should('be.visible');
  cy.contains('Gender: Male').should('be.visible');

  // homeworld
  cy.contains('Homeworld: Tatooine').should('be.visible');

  // films
  cy.contains('Films').should('be.visible');
  cy.contains('The Phantom Menace').should('be.visible');
  cy.contains('Attack of the Clones').should('be.visible');
  cy.contains('Revenge of the Sith').should('be.visible');

  // starships piloted
  cy.contains('Starships').should('be.visible');
  cy.contains('Naboo fighter').should('be.visible');
  cy.contains('Trade Federation cruiser').should('be.visible');
  cy.contains('Jedi Interceptor').should('be.visible');

  // action buttons
  cy.contains('button', 'Add to Favourites').should('be.visible');
  cy.contains('button', 'Go back home').should('be.visible');
  cy.contains('button', 'Go to Favourites').should('be.visible');
});





