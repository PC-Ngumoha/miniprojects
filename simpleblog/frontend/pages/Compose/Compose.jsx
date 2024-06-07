import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Compose.module.css';

export default function Compose() {
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState('');


  const handleChangeImage = (evt) => {
    evt.preventDefault();
    setImage(URL.createObjectURL(evt.target.files[0]));
    setFileName(evt.target.files[0].name);
  };

  const handleDropImage = (evt) => {
    evt.preventDefault();
    const droppedFiles = evt.dataTransfer.files;

    if (droppedFiles.length > 0) {
      setImage(URL.createObjectURL(droppedFiles[0]));
      setFileName(droppedFiles[0].name);
    }
  };

  return (
    <form className={ styles.formArea }>
      <label htmlFor="blogImage"
        className={ styles.imageArea }
        onDrop={handleDropImage}
        onDragOver={(evt) => evt.preventDefault()}>
        {
          image ? (
            <>
              <span>
                <FontAwesomeIcon
                  icon={ faCircleXmark }
                  className={ styles.previewClose }
                  onClick={(evt) => {
                    evt.preventDefault();
                    setImage(undefined);
                    setFileName('');
                  }}
                />
              </span>
              <img
                src={ image }
                alt={ fileName }
              />
              <span><b>File Name:</b> { fileName }</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={ faImage }/>
              <span>Click / Drag to upload thumbnail (.png, .jpg files only)</span>
            </>
          )
        }

        <input
          type="file"
          id="blogImage"
          accept="image/jpeg image/jpg image/png"
          onChange={handleChangeImage}
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
