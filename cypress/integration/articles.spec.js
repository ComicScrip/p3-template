describe("articles", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("should display a list of articles when the api responds correctly", () => {
    cy.intercept("**/posts", { fixture: "posts.json" });
    cy.visit("/articles");
    cy.contains("This piece of data does not come from the real API");
  });

  it("should display an error when the api is down", () => {
    cy.intercept("**/posts", { statusCode: 500 });
    cy.visit("/articles");
    cy.contains("An error occured, please try again later");
  });
});
