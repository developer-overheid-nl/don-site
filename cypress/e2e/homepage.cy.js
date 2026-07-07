const today_start = new Date();
const today_end = new Date();
today_end.setHours(today_start.getHours() + 1);
const yesterday_start = new Date();
yesterday_start.setDate(today_start.getDate() - 1);
const yesterday_end = new Date();
yesterday_end.setDate(today_start.getDate() - 1);
yesterday_end.setHours(yesterday_start.getHours() + 1);
const tomorrow_start = new Date();
tomorrow_start.setDate(today_start.getDate() + 1);
const tomorrow_end = new Date();
tomorrow_end.setDate(today_start.getDate() + 1);
tomorrow_end.setHours(tomorrow_start.getHours() + 1);

const events = [
      {
        "title": "Event Yesterday",
        "start_date": yesterday_start.toISOString(),
        "end_date": yesterday_end.toISOString(),
        "place": "Some place",
        "summary": "Fysieke meetup voor iedereen die betrokken is bij of interesse heeft in het bouwen van software binnen de overheid. Met talks, demo's, nieuwe features en een roadmap-update. Na afloop borrel.",
        "url": "https://developer.overheid.nl/"
      },
      {
        "title": "Event Today",
        "start_date": today_start.toISOString(),
        "end_date": today_end.toISOString(),
        "place": "Some place",
        "summary": "Fysieke meetup voor iedereen die betrokken is bij of interesse heeft in het bouwen van software binnen de overheid. Met talks, demo's, nieuwe features en een roadmap-update. Na afloop borrel.",
        "url": "https://developer.overheid.nl/"
      },
      {
        "title": "Event Tomorrow",
        "start_date": tomorrow_start.toISOString(),
        "end_date": tomorrow_end.toISOString(),
        "place": "Some place",
        "summary": "Fysieke meetup voor iedereen die betrokken is bij of interesse heeft in het bouwen van software binnen de overheid. Met talks, demo's, nieuwe features en een roadmap-update. Na afloop borrel.",
        "url": "https://developer.overheid.nl/"
      },
    ];

describe('The Home Page', () => {
  beforeEach(() => {
    cy.intercept('/agenda/events.json', events).as('getEvents');
  });

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('shows tomorrow and today`s events', () => {
    cy.visit('/');
    cy.wait(['@getEvents']);

    let eventsList = cy.contains('h2', 'Aankomende evenementen').next('ul').children();

    eventsList.should('have.length', 2).then( items => {
      expect(items[0]).to.contain.text('Event Today');
      expect(items[1]).to.contain.text('Event Tomorrow');
      expect(items).not.to.contain.text('Event Yesterday');
    });
  });
});
