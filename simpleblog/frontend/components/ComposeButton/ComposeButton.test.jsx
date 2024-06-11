import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ComposeButton from './ComposeButton';

describe('Compose Button', () => {
  it('should render properly', () => {
    const comp = render(
      <MemoryRouter initialEntries={['/']}>
        <ComposeButton />
      </MemoryRouter>
    );
    expect(comp).toMatchSnapshot();
  });
});