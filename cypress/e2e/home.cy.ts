/// <reference types="cypress" />

describe('Página Principal', () => {
  beforeEach(() => {
    // Visitar página antes de cada test
    cy.visit('/');
  });

  it('debe cargar la página correctamente', () => {
    // Verificar que la página carga
    cy.get('body').should('be.visible');
  });

  it('debe tener el título correcto', () => {
    // Verificar título de la página
    cy.title().should('not.be.empty');
  });

  it('debe mostrar contenido principal', () => {
    // Verificar que hay contenido principal
    cy.get('h1, h2').should('be.visible');
  });
});