describe('Tech Quiz App - E2E', () => {
  // Add 'beforeEach' to run before each test
  beforeEach(() => {
    // Visit app's local URL
    cy.visit('http://localhost:3000');
  });

  // Function to click the Start Quiz button and Check that a question is displayed
  it('starts the quiz when the Start button is clicked', () => {
    cy.get('[data-testid="start-button"]').click();
    cy.get('[data-testid="question"]').should('exist');
  });

  it('answers 10 questions and shows the final score', () => {
    cy.contains('[data-testid="start-button"]').click();

    // Answer each questions
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid^="answer-"]').first().click();
    }

    // Final score is displayed after the last question
    cy.get('[data-testid="score"]').should('be.visible');
  });

  // Function to complete the quiz
  it('can restart the quies after finishing', () => {
    cy.get('[data-testid="start-button"]').click();

    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid^="answer-"]').first().click();
    }

    // Function to restart the quiz
    cy.get('[data-testid="restart-button"]').click();

    // Function to restart quiz with a new question
    cy.get('[data-testid="question"]').should('be.visible');
  });
});