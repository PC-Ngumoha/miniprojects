import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TodoListBody from './TodoListBody';

describe('TodoList Body', () => {
  it('should match screenshot', () => {
    const result = render(<TodoListBody />);
    expect(result.container).toMatchSnapshot();
  });
});
