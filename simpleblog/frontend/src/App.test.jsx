/**
 * App.test.jsx
 */
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the App component on the page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    screen.debug(); // Prints out the JSX to the console.
  });
});
