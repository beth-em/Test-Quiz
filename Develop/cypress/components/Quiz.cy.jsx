import Quiz from '../../../client/src/components/Quiz';
import { mount } from 'cypress/react';
import questions from '../fixtures/questions.json';

describe('Quiz Component Test', () => {
    it('renders the first question after starting', () => {
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: questions,
        }).as('getQuestions');

        mount(<Quiz />);

        cy.get('[data-testid="start-button"]').click();

        cy.wait('@getQuestions');

        cy.get('[data-testid="question"]').should('contain', questions[0].question);
    });
});