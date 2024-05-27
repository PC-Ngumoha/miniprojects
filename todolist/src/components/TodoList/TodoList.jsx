import TodoListBody from "../TodoListBody/TodoListBody";
import TodoListHeader from "../TodoListHeader/TodoListHeader";
import styles from './TodoList.module.css';

export default function TodoList () {
  return (
    <section className={styles.todolistMain}>
      <TodoListHeader />
      <TodoListBody />
    </section>
  );
}