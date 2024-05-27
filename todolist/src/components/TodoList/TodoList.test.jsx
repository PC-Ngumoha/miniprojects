import { it, describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  it('should match screenshot', () => {
    const result = render(<TodoList />);
    expect(result.container).toMatchSnapshot();
  });
});