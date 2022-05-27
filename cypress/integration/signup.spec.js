/// <reference types="cypress" />

// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("signup", () => {
  beforeEach(() => {
    cy.task("cleanDB");
    cy.viewport("iphone-6");
    cy.visit("/signup");
  });

  it("should allow the user to sign up when valid info is provided", () => {
    cy.get("[data-cy=name]").type("Dave Lopper");
    cy.get("[data-cy=email]").type("dave.lopper@gmail.com");
    cy.get("[data-cy=password]").type("67TRCXXs6$tt7");
    cy.get("[data-cy=passwordConfirmation]").type("67TRCXXs6$tt7");
    cy.get("[data-cy=registerBtn]").click();
    cy.contains("Thanks ! You can now log in !");
  });

  it("should not allow the user to sign up when invalid info is provided", () => {
    const checkFormIsNotSent = () => {
      cy.get("[data-cy=registerBtn]").click();
      cy.contains("Thanks ! You can now log in !").should("not.exist");
    };
    checkFormIsNotSent();
    cy.get("[data-cy=name]").type("Dave Lopper");
    checkFormIsNotSent();
    cy.get("[data-cy=email]").type("dave.loppergmail.com");
    checkFormIsNotSent();
    cy.get("[data-cy=email]").type("{selectAll}dave.lopper@gmail.com");
    checkFormIsNotSent();
    cy.get("[data-cy=password]").type("2short");
    cy.get("[data-cy=passwordConfirmation]").type("2short");
    checkFormIsNotSent();
    cy.contains(
      "password is too weak. It must contain an uppercase letter, a lowercase letter, a symbol and a number"
    );
    cy.get("[data-cy=password]").type("{selectAll}+bGZj5q8rS_?J;Ev");
    cy.get("[data-cy=passwordConfirmation]").type(
      "{selectAll}+bGZj5q8rS_-J;Ev"
    );
    checkFormIsNotSent();
    cy.contains("passwords do not match");
  });

  it("should print an error if email already exist", () => {
    const email = "dave.lopper@gmail.com";
    cy.task("createUser", {
      email,
      password: "superpassword",
      name: "dave lopper",
    });
    cy.get("[data-cy=name]").type("Dave Lopper");
    cy.get("[data-cy=email]").type("dave.lopper@gmail.com");
    cy.get("[data-cy=password]").type("67TRCXXs6$tt7");
    cy.get("[data-cy=passwordConfirmation]").type("67TRCXXs6$tt7");
    cy.get("[data-cy=registerBtn]").click();
    cy.contains("This email already exists");
  });
});
