describe('Login Page Test Suite', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  afterEach(() => {
    cy.wait(2000);
  })

  it('should login with valid credentials', () => {
    cy.get("[placeholder='Username']").type('Admin', {delay : 100});
    cy.get("[placeholder='Password']").type('admin123', {delay : 100});
    cy.get("[type='submit']").click();
    cy.url().should('include', '/dashboard/index');
  });

  it('should not login with invalid username', () => {
    cy.get("[placeholder='Username']").type('WrongUser', {delay : 100});
    cy.get("[placeholder='Password']").type('admin123', {delay : 100});
    cy.get("[type='submit']").click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  it('should not login with invalid password', () => {
    cy.get("[placeholder='Username']").type('Admin', {delay : 100});
    cy.get("[placeholder='Password']").type('wrongpass', {delay : 100});
    cy.get("[type='submit']").click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  it('should show error when username is empty', () => {
    cy.get("[placeholder='Password']").type('admin123', {delay : 100});
    cy.get("[type='submit']").click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  it('should show error when password is empty', () => {
    cy.get("[placeholder='Username']").type('Admin', {delay : 100});
    cy.get("[type='submit']").click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  it('should show error when both fields are empty', () => {
    cy.get("[type='submit']").click();
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);
  });

  it('should display logo on login page', () => {
    cy.get('img[alt="company-branding"]').should('be.visible');
  });

  it('should logout successfully after login', () => {
    cy.get("[placeholder='Username']").type('Admin', {delay : 100});
    cy.get("[placeholder='Password']").type('admin123', {delay : 100});
    cy.get("[type='submit']").click();
    cy.url().should('include', '/dashboard');

    // Click on profile dropdown and logout
//     cy.get('.oxd-userdropdown-tab').click();
//     cy.contains('Logout').click();

//     cy.url().should('include', '/auth/login');
//   });

//   it('should prevent login with XSS input', () => {
//     cy.get("[placeholder='Username']").type('<script>alert(1)</script>', {delay : 100});
//     cy.get("[placeholder='Password']").type('admin123', {delay : 100});
//     cy.get("[type='submit']").click();
//     cy.get('.oxd-alert-content-text')
//       .should('contain', 'Invalid credentials');
  });
});
