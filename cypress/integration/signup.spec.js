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
    cy.viewport("iphone-6"); // Set viewport to 375px x 667px
    cy.visit("/signup");
  });

  it("should allow the user to sign up with valid information", () => {
    cy.get('[data-cy="name"]').type("Dave Lopper");
    cy.get('[data-cy="email"]').type("dave.lopper@gmail.com");
    cy.get('[data-cy="password"]').type("67TRCXXs6$tt7");
    cy.get('[data-cy="passwordConfirmation"]').type("67TRCXXs6$tt7");
    cy.get('[data-cy="submitBtn"]').click();
    cy.contains("Thanks ! You should now be able to connect !").should(
      "be.visible"
    );
    cy.task("findUserByEmail", "dave.lopper@gmail.com").then((user) => {
      expect(user).to.not.be.null;
    });
  });

  it("does not send the form if there are validation errors", () => {
    const checkFormIsNotSubmitted = () => {
      cy.get('[data-cy="submitBtn"]').click();
      cy.contains("Thanks ! You should now be able to connect !").should(
        "not.exist"
      );
    };
    checkFormIsNotSubmitted();
    cy.get('[data-cy="name"]').type("johndoe");
    checkFormIsNotSubmitted();
    cy.get('[data-cy="email"]').type("dave.loppergmail.com");
    checkFormIsNotSubmitted();
    cy.get('[data-cy="email"]').type("{selectAll}dave.lopper@gmail.com");
    cy.get('[data-cy="password"]').type("2short");
    cy.get('[data-cy="passwordConfirmation"]').type("2short");
    checkFormIsNotSubmitted();
    cy.contains(
      "Your password should be more than 8 caracters and should include a non-capital letter, a capital letter, a symbol and a number"
    );
    cy.get('[data-cy="password"]').type("{selectAll}67TRCXXs6$tt7");
    cy.get('[data-cy="passwordConfirmation"]').type("{selectAll}67TRCXXs6$tt6");
    checkFormIsNotSubmitted();
    cy.contains("Passwords do not match");
  });

  it("prints an error if email already exist", () => {
    const email = "dave.lopper@gmail.com";
    cy.task("createUser", { email, password: "67TRCXXs6$tt7" });
    cy.get('[data-cy="name"]').type("Dave Lopper");
    cy.get('[data-cy="email"]').type("dave.lopper@gmail.com");
    cy.get('[data-cy="password"]').type("67TRCXXs6$tt7");
    cy.get('[data-cy="passwordConfirmation"]').type("67TRCXXs6$tt7");
    cy.get('[data-cy="submitBtn"]').click();
    cy.contains("Thanks ! You should now be able to connect !").should(
      "not.exist"
    );
    cy.contains("Email already exists");
  });
});
