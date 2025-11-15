/// <reference types="cypress" />

describe('Registro de Usuario', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  describe('Interfaz del formulario', () => {
    it('debe mostrar todos los campos requeridos', () => {
      cy.get('h2').should('contain', 'Crear nueva cuenta');
      
      // Verificar campos
      cy.get('input[name="cc"]').should('be.visible');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('input[name="tel"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="pass"]').should('be.visible');
      cy.get('input[name="confirmPass"]').should('be.visible');
      
      // Verificar botón
      cy.get('button[type="submit"]').should('contain', 'Crear cuenta');
    });
  });

  describe('Validaciones', () => {
    it('debe mostrar errores para campos requeridos vacíos', () => {
      cy.get('button[type="submit"]').click();
      
      cy.get('.text-red-600').should('contain', 'La cédula es requerida');
      cy.get('.text-red-600').should('contain', 'El nombre es requerido');
      cy.get('.text-red-600').should('contain', 'La contraseña es requerida');
    });

    it('debe validar formato de email', () => {
      cy.fillRegistrationForm({
        cc: '1234567890',
        name: 'Test User',
        tel: '3001234567',
        email: 'email-invalido',
        password: 'TestPassword123!'
      });
      
      cy.get('button[type="submit"]').click();
      cy.get('.text-red-600').should('contain', 'Email inválido');
    });

    it('debe validar que las contraseñas coincidan', () => {
      cy.get('input[name="cc"]').type('1234567890');
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="pass"]').type('Password123');
      cy.get('input[name="confirmPass"]').type('DiferentePassword');
      
      cy.get('button[type="submit"]').click();
      cy.get('.text-red-600').should('contain', 'Las contraseñas no coinciden');
    });
  });

  describe('Registro exitoso', () => {
    it('debe registrar un nuevo usuario', () => {
      cy.generateUniqueUser().then((userData) => {
        cy.fillRegistrationForm(userData);
        cy.get('button[type="submit"]').click();
        
        // Verificar mensaje de éxito
        cy.get('.text-green-600').should('contain', 'Usuario registrado exitosamente');
        
        // Verificar redirección
        cy.url({ timeout: 3000 }).should('eq', Cypress.config().baseUrl + '/');
      });
    });

    it('debe mostrar estado de carga', () => {
      cy.generateUniqueUser().then((userData) => {
        cy.fillRegistrationForm(userData);
        cy.get('button[type="submit"]').click();
        
        // Verificar estado de carga
        cy.get('button[type="submit"]').should('contain', 'Registrando...');
        cy.get('button[type="submit"]').should('be.disabled');
      });
    });
  });

  describe('Manejo de errores', () => {
    it('debe manejar errores de servidor', () => {
      // Interceptar API y simular error
      cy.intercept('POST', '/api/user', { 
        statusCode: 500, 
        body: { success: false, message: 'Error interno del servidor' } 
      }).as('registerError');

      cy.generateUniqueUser().then((userData) => {
        cy.fillRegistrationForm(userData);
        cy.get('button[type="submit"]').click();
        
        cy.wait('@registerError');
        cy.get('.text-red-600').should('contain', 'Error interno del servidor');
      });
    });
  });
});

describe('Tests con Fixtures', () => {
  it('debe usar datos de fixtures', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/register');
      
      const user = users.validUser;
      cy.fillRegistrationForm(user);
      cy.get('button[type="submit"]').click();
    });
  });

  it('debe usar configuración de fixtures', () => {
    cy.fixture('test-data').then((data) => {
      cy.visit(data.urls.register);
      
      cy.get(data.selectors.inputs.cc).type('1234567890');
      cy.get(data.selectors.buttons.submit).click();
      
      cy.get('.text-red-600').should('contain', data.messages.errors.requiredField);
    });
  });
});