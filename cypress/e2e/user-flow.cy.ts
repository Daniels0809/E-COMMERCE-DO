/// <reference types="cypress" />

describe('Flujo Completo de Usuario', () => {
  it('debe completar el flujo: registro → login → dashboard → logout', () => {
    cy.generateUniqueUser().then((userData) => {
      // PASO 1: Registro
      cy.visit('/register');
      cy.fillRegistrationForm(userData);
      cy.get('button[type="submit"]').click();
      
      // Verificar registro exitoso
      cy.get('.text-green-600').should('contain', 'Usuario registrado exitosamente');
      
      // PASO 2: Redirección al home
      cy.url({ timeout: 3000 }).should('eq', Cypress.config().baseUrl + '/');
      
      // PASO 3: Login
      cy.get('input[name="email"]').type(userData.email);
      cy.get('input[name="pass"]').type(userData.password);
      cy.get('button[type="submit"]').click();
      
      // PASO 4: Verificar dashboard
      cy.url({ timeout: 5000 }).should('include', '/dashboard');
      cy.get('h1').should('contain', 'TaskLoad Dashboard');
      cy.get('.text-gray-600').should('contain', userData.name);
      
      // PASO 5: Logout
      cy.get('button').contains('Cerrar Sesión').click();
      
      // PASO 6: Verificar vuelta al home
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h2').should('contain', 'Iniciar Sesión');
    });
  });

  it('debe manejar login con credenciales incorrectas', () => {
    cy.visit('/');
    
    cy.get('input[name="email"]').type('usuario@noexiste.com');
    cy.get('input[name="pass"]').type('PasswordIncorrecto');
    cy.get('button[type="submit"]').click();
    
    cy.get('.text-red-600').should('contain', 'Credenciales inválidas');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});