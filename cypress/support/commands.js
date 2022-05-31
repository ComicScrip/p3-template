// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add(
  "signup",
  ({
    email = "visitor@website.com",
    password = "verysecure",
    name = "visitor",
  } = {}) => {
    cy.dataSession({
      name: "userInDb",
      setup: () => {
        cy.task("deleteUserByEmail", email);
        cy.task("createUser", { email, password, name });
      },
      validate: (saved) =>
        cy
          .task("findUserByEmail", saved.email)
          .then((user) => Promise.resolve(user?.email === email)),
    });
  }
);

Cypress.Commands.add(
  "login",
  ({ email = "visitor@website.com", password = "verysecure" } = {}) => {
    cy.dataSession({
      name: "userSession",
      setup: () => {
        cy.request({ url: "/api/auth/csrf" })
          .then(({ body: { csrfToken } }) =>
            cy.request({
              url: "/api/auth/callback/credentials",
              method: "POST",
              body: {
                csrfToken,
                username: email,
                password,
              },
            })
          )
          .then(() => cy.getCookie("next-auth.session-token").should("exist"))
          .then((cookie) =>
            cy.request({ url: "/api/profile" }).then(({ body: user }) => ({
              cookie,
              user,
            }))
          );
      },
      validate: (saved) =>
        cy
          .request({
            url: "/api/profile",
            failOnStatusCode: false,
            headers: {
              Cookie: `next-auth.session-token=${saved.cookie.value}`,
            },
          })
          .then(({ body: user }) => user.email === saved.user.email),
      recreate: (saved) => {
        cy.setCookie("next-auth.session-token", saved.cookie.value);
      },
      dependsOn: ["userInDb"],
    });
  }
);

Cypress.Commands.add(
  "setupCurrentUser",
  ({ email = "visitor@website.com", name = "Visitor" } = {}) => {
    cy.dataSession({
      name: "currentUser",
      setup: () => {
        cy.signup({ name, email });
        cy.login({ email });
        cy.get("@userSession").then((session) => session.user);
      },
      validate: () => false,
    });
  }
);
