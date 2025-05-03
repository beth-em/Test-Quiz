import Quiz from '../../../client/src/components/Quiz';
import { mount } from 'cypress/react';
import questions from '../fixtures/questions.json';

describe('Quiz Component Test', () => {
    it('renders the first question after starting', () => {
        // getQuestions function to return mock data
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: questions,
        }).as('getQuestions');

        // Mount the Quiz component in isolation
        mount(<Quiz />);
        // Function to 'click' the start button
        cy.get('[data-testid="start-button"]').click();
        // Function to wait for the mock question API call
        cy.wait('@getQuestions');
        // Function to check that the first question appears
        cy.get('[data-testid="question"]').should('contain', questions[0].question);
    });
});