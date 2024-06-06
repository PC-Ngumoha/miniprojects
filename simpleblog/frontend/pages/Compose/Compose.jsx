import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import styles from './Compose.module.css';

export default function Compose() {
  return (
    <form className={ styles.formArea }>
      <label htmlFor="blogImage" className={ styles.imageArea }>
        <input
          type="file"
          id="blogImage"
          accept="image/jpeg image/jpg image/png"
        />
        <FontAwesomeIcon icon={ faImage }/>
      </label>
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title"/>
      </div>

      <div>
        <label htmlFor="body">Body: </label>
        <textarea id="body"></textarea>
      </div>

      <div>
        <button className={ styles.submitButton }>
          Post
        </button>
      </div>
    </form>
  );
}
