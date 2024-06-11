import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should display properly', () => {
    const comp = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(comp).toMatchSnapshot();
    // expect(screen.getByText(/Simple/)).toBeInTheDocument();
    expect(
      screen.getByRole('navigation')
    ).toBeInTheDocument();
  });
});