import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styles from './TodoListItem.module.css';

export default function TodoListItem ({ task, setTasks }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.container}
      onMouseEnter={
        () => {
          setIsVisible(true);
        }
      }
      onMouseLeave={
        () => {
          setIsVisible(false);
        }
      }
    >
      <input
        className={styles.check}
        type="checkbox"
        name="iscomplete"
        id="iscomplete"
      />
      <p className={styles.taskText}>{task.detail}</p>
      {
        isVisible ? (
          <button
            className={styles.delButton}
            onClick={() => {
              setTasks((currentTasks) => (
                currentTasks.filter((currentTask) => currentTask.id !== task.id)
              ))
            }}>
            {<FontAwesomeIcon icon={faTrashCan} /> || 'Delete'}
          </button>
        ) : (
          <div className={styles.delHide} />
        )
      }
    </div>
  );
}

TodoListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    detail: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  setTasks: PropTypes.func.isRequired,
}
