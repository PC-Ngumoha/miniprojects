import { useState, useEffect } from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import TaskInput from "../TaskInput/TaskInput";
import styles from './TodoListBody.module.css';

export default function TodoListBody () {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      setTasks(savedTasks);
      const lastCount = savedTasks[savedTasks.length - 1].id;
      setCount(lastCount + 1);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks])

  return (
    <>
      <div className={styles.todolistBody}>
        {tasks.length > 0 ?
          tasks.map((task) => (
            <TodoListItem
              key={task.id}
              task={task}
              setTasks={setTasks}
            />
          )) : (
            <span className={styles.todolistHelperText}>
              No Tasks Available
            </span>
          )
        }
      </div>
      <TaskInput
        count={count}
        setCount={setCount}
        setTasks={setTasks}
      />
    </>
  );
}
