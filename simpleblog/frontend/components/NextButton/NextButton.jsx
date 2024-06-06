import PropTypes from 'prop-types';
import styles from './NextButton.module.css';

export default function NextButton({ displayText }) {
  return (
    <button className={ styles.nextButton }>
      { displayText }
    </button>
  );
}

NextButton.propTypes = {
  displayText: PropTypes.string.isRequired,
}
