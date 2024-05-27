import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoListHeader from './TodoListHeader';

describe('TodoList Header', () => {
  it('should match screenshot', () => {
    const result = render(<TodoListHeader />);
    expect(result.container).toMatchSnapshot();
  });

  it('should contain header title: Todolist', () => {
    render(<TodoListHeader />);
    expect(
      screen.getByRole('heading', { name: /Todolist/ })
    ).toBeInTheDocument();
  });
});