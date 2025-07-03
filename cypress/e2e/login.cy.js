require("cypress-xpath"); // Import the XPath plugin

describe("Login Page Test Suite", () => {
  const baseUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  afterEach(() => {
    cy.wait(2000); // Optional delay for visual clarity
  });

  it("should login with valid credentials", () => {
    cy.get("[placeholder='Username']").type("Admin", { delay: 100 });
    cy.get("[placeholder='Password']").type("admin123", { delay: 100 });
    cy.get("[type='submit']").click();
    cy.url().should("include", "/dashboard/index");
  });

  // list sections in Admin
  it("Should Select each element from the list", () => {
    // Login first
    cy.get("[placeholder='Username']").type("Admin", { delay: 100 });
    cy.get("[placeholder='Password']").type("admin123", { delay: 100 });
    cy.get("[type='submit']").click();

    cy.xpath('//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[2]/span')
      .should("contain.text", "Job")
      .click();
  });
  it("should click on the Admin section from the sidebar", () => {
    // Login first
    cy.get("[placeholder='Username']").type("Admin", { delay: 100 });
    cy.get("[placeholder='Password']").type("admin123", { delay: 100 });
    cy.get("[type='submit']").click();

    // Click the Admin item using XPath
    cy.xpath('//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a/span')
      .should("contain.text", "Admin")
      .click();

    // Click to add user using Xpath
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button')
      .should("contains.text", "Add")
      .click();

    //cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div/div[1]')
    //.should('contains.text', 'Select').click();

    cy.xpath(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div/div[1]'
    )
      .should("contains.text", "Select")
      .click();

    // Optionally validate URL or presence of Admin page elements
    cy.url().should("include", "/admin"); // Update this based on actual route
  });
});
