/// <reference types="cypress" />
// ***********************************************
// Declaración de tipos para comandos personalizados
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para llenar formulario de registro
       */
      fillRegistrationForm(userData: {
        cc: string;
        name: string;
        tel: string;
        email: string;
        password: string;
      }): Chainable<void>;
      
      /**
       * Comando personalizado para generar usuario único
       */
      generateUniqueUser(): Chainable<{
        cc: string;
        name: string;
        tel: string;
        email: string;
        password: string;
      }>;
    }
  }
}

// Comando para llenar formulario de registro
Cypress.Commands.add('fillRegistrationForm', (userData) => {
  cy.get('input[name="cc"]').type(userData.cc);
  cy.get('input[name="name"]').type(userData.name);
  cy.get('input[name="tel"]').type(userData.tel);
  cy.get('input[name="email"]').type(userData.email);
  cy.get('input[name="pass"]').type(userData.password);
  cy.get('input[name="confirmPass"]').type(userData.password);
});

// Comando para generar usuario único
Cypress.Commands.add('generateUniqueUser', () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  
  return cy.wrap({
    cc: `${timestamp}${randomNum}`.slice(-10),
    name: `Usuario Test ${randomNum}`,
    tel: `300${randomNum}${timestamp}`.slice(-10),
    email: `test${timestamp}${randomNum}@example.com`,
    password: 'TestPassword123!'
  });
});
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Comando para login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="pass"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Comando para logout
Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Cerrar Sesión').click();
});

// Comando para limpiar base de datos (desarrollo)
Cypress.Commands.add('clearTestData', () => {
  // Solo en ambiente de test
  if (Cypress.env('NODE_ENV') === 'test') {
    cy.request('DELETE', `${Cypress.env('apiUrl')}/test/clear`);
  }
});

// Actualizar declaración de tipos
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      clearTestData(): Chainable<void>;
    }
  }
}