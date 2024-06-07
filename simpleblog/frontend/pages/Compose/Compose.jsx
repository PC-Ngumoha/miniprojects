import { useState } from 'react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import styles from './Compose.module.css';

export default function Compose() {
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState('');

  return (
    <form className={ styles.formArea }>
      <ImageUpload
        image={image}
        fileName={fileName}
        setImage={setImage}
        setFileName={setFileName}
      />

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
