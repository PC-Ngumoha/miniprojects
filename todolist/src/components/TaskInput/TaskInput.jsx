import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TaskInput.module.css';

export default function TaskInput ({ count, setCount, setTasks }) {
  const [detail, setDetail] = useState('');
  return (
    <form
      className={styles.container}
      onSubmit={(evt) => {
        evt.preventDefault();
        const newTask = {
          id: count,
          detail: detail,
          completed: false
        }
        setCount((currentCount) => currentCount + 1);
        setTasks((currentTasks) => [...currentTasks, newTask]);
        setDetail('');
      }}>
      <input
        className={styles.input}
        type="text"
        name="newTask"
        value={detail}
        onChange={(evt) => {
          evt.preventDefault();
          setDetail(evt.target.value);
        }}
        autoComplete="off" />
      <button className={styles.submit}>+ New Task</button>
    </form>
  )
}

TaskInput.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};
