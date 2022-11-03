/// <reference types="cypress" />

describe('Тесты на игру в пары 2х2', () => {
  //запуск игры 2х2
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
    cy.get('input[value=2]').click();
    cy.get('#start-button').click();
  });

  it('Проверка что игра запустилась в формате 2х2 ', () => {
    cy.get('li').should('have.length', 4);
  });
  it('Проверка что в каждой клетке цифра должна быть невидима ', () => {
    cy.get('li').should('have.class', 'card--unsolved');
    cy.get('li').should('not.have.class', 'card--solved');
  });

  it('Проверка что при нажатии на одну произвольную карточку  она осталась открытой', () => {
    cy.get('ul li:first-child').click();
    cy.get('ul li:first-child').should('have.class', 'card--active');
  });
  it(`Проверка на пары (Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, 
    то повторять со следующей карточкой, пока не будет найдена пара
    Проверка, что найденная пара карточек осталась видимой)`, () => {
    let counter = 1;
    const CLOSE_DELAY = 1100;

    function clickCards(cards) {
      cy.get(cards[0]).click();
      cy.get(cards[counter]).click();
      cy.wait(CLOSE_DELAY);
      if (cards[0].innerHTML === cards[counter].innerHTML) {
        cy.get(cards[0]).should('have.class', 'card--solved');
        cy.get(cards[counter]).should('have.class', 'card--solved');
      } else {
        counter++;
        clickCards(cards);
      }
    }
    cy.get('.card').then(($cards) => {
      clickCards($cards);
    });
  });
});

describe('Тесты на игру в пары 4х4', () => {
  //запуск игры 4х4
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
    cy.get('input[value=4]').click();
    cy.get('#start-button').click();
  });

  it('Проверка что игра запустилась в формате 4х4 ', () => {
    cy.get('li').should('have.length', 16);
  });
  it('Проверка что в каждой клетке цифра должна быть невидима ', () => {
    cy.get('li').should('have.class', 'card--unsolved');
    cy.get('li').should('not.have.class', 'card--solved');
  });

  it('Проверка что при нажатии на одну произвольную карточку  она осталась открытой', () => {
    cy.get('ul li:first-child').click();
    cy.get('ul li:first-child').should('have.class', 'card--active');
  });
  it(`Проверка на пары (Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, 
    то повторять со следующей карточкой, пока не будет найдена пара
    Проверка, что найденная пара карточек осталась видимой)`, () => {
    let counter = 1;
    const CLOSE_DELAY = 1100;

    function clickCards(cards) {
      cy.get(cards[0]).click();
      cy.get(cards[counter]).click();
      cy.wait(CLOSE_DELAY);
      if (cards[0].innerHTML === cards[counter].innerHTML) {
        cy.get(cards[0]).should('have.class', 'card--solved');
        cy.get(cards[counter]).should('have.class', 'card--solved');
      } else {
        counter++;
        clickCards(cards);
      }
    }
    cy.get('.card').then(($cards) => {
      clickCards($cards);
    });
  });
  it(`Проверка на пары (Нажать на левую верхнюю карточку, затем на следующую. Если это пара, 
    то повторять со следующими двумя карточками, пока не найдутся непарные карточки.
    Проверка, что после нажатия на вторую карточку обе становятся невидимыми)`, () => {
    let counter = 0;
    const CLOSE_DELAY = 1100;

    function clickCards(cards) {
      cy.get(cards[counter]).click();
      cy.get(cards[counter + 1]).click();
      cy.wait(CLOSE_DELAY);
      if (cards[counter].innerHTML === cards[counter + 1].innerHTML) {
        cy.get(cards[counter]).should('have.class', 'card--solved');
        cy.get(cards[counter + 1]).should('have.class', 'card--solved');
        counter += 2;
        clickCards(cards);
      } else {
        cy.get(cards[counter])
          .should('have.class', 'card--unsolved')
          .should('not.have.class', 'card--active');
        cy.get(cards[counter + 1])
          .should('have.class', 'card--unsolved')
          .should('not.have.class', 'card--active');
      }
    }
    cy.get('.card').then(($cards) => {
      clickCards($cards);
    });
  });
});
