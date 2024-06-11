import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NextButton from './NextButton';

describe('Page Buttons', () => {
  it('should display properly', () => {
    const comp = render(
      <MemoryRouter>
        <NextButton displayText='Next Page' />
      </MemoryRouter>
    );

    expect(comp).toMatchSnapshot();
    // expect(screen.getByText(/Next\sPage/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: /Next\sPage/})
    ).toBeInTheDocument();
  });
});