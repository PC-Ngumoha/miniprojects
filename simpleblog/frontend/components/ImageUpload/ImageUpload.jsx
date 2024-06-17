import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons';
import styles from './ImageUpload.module.css';

export default function ImageUpload({
  image, fileName, setImage, setFileName
}) {

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
        name='thumbnail'
        accept="image/jpeg image/jpg image/png"
        onChange={handleChangeImage}
      />
    </label>
  );
}

ImageUpload.propTypes = {
  image: PropTypes.any,
  fileName: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
};
