import { useNavigate } from 'react-router-dom';
import styles from './ComposeButton.module.css';

export default function ComposeButton() {
  const navigate = useNavigate();

  return (
    <button
      className={ styles.compose }
      onClick={() => {navigate('/compose')}}
    >
      +
    </button>
  )
}
