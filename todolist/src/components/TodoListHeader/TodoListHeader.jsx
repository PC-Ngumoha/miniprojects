import styles from './TodoListHeader.module.css';

export default function TodoListHeader () {
  return (
    <>
      <div className={styles.todolistHeader}>
        <h1 className={styles.todolistHeaderTitle}>Todolist</h1>
      </div>
      <br />
    </>
  );
}
