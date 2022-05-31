/// <reference types="cypress" />

describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("is accessible from the homepage", () => {
    cy.visit("/");
    cy.get("[data-cy='loginBtn']").click();
    cy.url().should("include", "/login");
  });

  describe("without session", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.signup({ email: "dave.lopper@gmail.com", password: "superpassword" });
      cy.visit("/login");
    });

    it("can login with correct credentials", () => {
      cy.get("[data-cy='username']").type("dave.lopper@gmail.com");
      cy.get("[data-cy='password']").type("superpassword");
      cy.get("[data-cy='signinBtn']").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    it("cannot login with incorrect email", () => {
      cy.contains("Log In").should("exist");
      cy.get("[data-cy='username']").type("dave.loper@gmail.com");
      cy.get("[data-cy='password']").type("superpassword");
      cy.get("[data-cy='signinBtn']").click();
      cy.contains("Invalid credentials");
    });

    it("cannot login with incorrect password", () => {
      cy.get("[data-cy='username']").type("dave.lopper@gmail.com");
      cy.get("[data-cy='password']").type("superpasword");
      cy.get("[data-cy='signinBtn']").click();
      cy.contains("Invalid credentials");
    });
  });

  describe("with session", () => {
    beforeEach(() => {
      cy.setupCurrentUser({ email: "dave.lopper@gmail.com" });
      cy.visit("/login");
    });

    it("should print the email of the current user", () => {
      cy.contains("dave.lopper@gmail.com");
    });

    it("shows a disconnect button", () => {
      cy.get("[data-cy='disconnectBtn']").click();
      cy.contains("dave.lopper@gmail.com").should("not.exist");
    });
  });
});
