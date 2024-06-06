import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Compose.module.css';

export default function Compose() {
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState('No file selected yet');


  const handleImageUploadPreview = (evt) => {
    setImage(URL.createObjectURL(evt.target.files[0]));
    setFileName(evt.target.files[0].name);
  };

  return (
    <form className={ styles.formArea }>
      <label htmlFor="blogImage" className={ styles.imageArea }>
        {
          image ? (
            <>
              <span>
                <FontAwesomeIcon
                  icon={ faXmark }
                  onClick={(evt) => {
                    evt.preventDefault();
                    setImage(undefined);
                    setFileName('No file selected yet');
                  }}
                />
              </span>
              <img
                src={ image }
                alt={ fileName }
              />
              <span>File Name: { fileName }</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={ faImage }/>
              <span>Click To Upload Thumbnail (.png, .jpg files only)</span>
            </>
          )
        }

        <input
          type="file"
          id="blogImage"
          accept="image/jpeg image/jpg image/png"
          onChange={handleImageUploadPreview}
        />
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
