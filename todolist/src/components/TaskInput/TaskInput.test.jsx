import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TaskInput from './TaskInput';

describe('TaskInput component', () => {
  it('should match screenshot', () => {
    const mockProps = {
      count: 1,
      setCount: () => { },
      setTasks: () => { },
    }
    const result = render(
      <TaskInput
        count={mockProps.count}
        setCount={mockProps.setCount}
        setTasks={mockProps.setTasks}
      />
    );
    expect(result.container).toMatchSnapshot();
  });
});
