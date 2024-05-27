import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TodoListItem from "./TodoListItem";

describe('TodoList Item', () => {
  it('should match screenshot', () => {
    const mockProps = {
      task: {
        id: 1,
        detail: 'Task',
        completed: false,
      },
      setTasks: () => { },
    }
    const result = render(
      <TodoListItem
        task={mockProps.task}
        setTasks={mockProps.setTasks}
      />
    );
    expect(result.container).toMatchSnapshot();
  });
});