import PropTypes from 'prop-types';
import styles from './NextButton.module.css';

export default function NextButton({ displayText, handleClick }) {
  return (
    <button
      className={ styles.nextButton }
      onClick={handleClick}>
      { displayText }
    </button>
  );
}

NextButton.propTypes = {
  displayText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}
