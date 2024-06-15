import PropTypes from 'prop-types';
import style from './Modal.module.css';

export default function Modal({ open, onClose, children }) {
  return (
      open && (
          <div
            className={ style.backdrop }
            onClick={ onClose }>
            <div
              className={ style.content }
              onClick={(evt) => { evt.stopPropagation(); }}>
              { children }
            </div>
          </div>
      )
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
