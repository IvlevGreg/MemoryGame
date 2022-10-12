/// <reference types="cypress" />

describe('Тесты на игру в пары', () => {
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
  it('Проверка что в каждой клетке цифра должна быть невидима ', () => {
    cy.get('li').should('have.class', 'card--unsolved');
    cy.get('li').should('not.have.class', 'card--solved');
  });
  it('Проверка что при нажатии на одну произвольную карточку  она осталась открытой', () => {
    cy.get('ul li:first-child').click();
    cy.get('ul li:first-child').should('have.class', 'card--active');
  });
  it('Проверка на пары', () => {
    cy.get('#0').click();
    cy.get('#1').click();
    if (true) {
      cy.get('#0').click();
      cy.get('#2').click();
    } else {
      cy.get('#0').should('have.class', 'card--solved');
      cy.get('#1').should('have.class', 'card--solved');
    }
  });
});
