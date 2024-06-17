import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Post.module.css';

export default function Post({id, title, thumbnail, body}) {

  return (
    <div className={ styles.card }>
      <img src={thumbnail} alt="baggy-brown" />
      <div className={ styles.details }>
        <h1>{title}</h1>
        <p>
          {
            body.length > 50 ? `${body.slice(0, 50)} ...` : body
          }
        </p>
        <div className={ styles.seeMore }>
          <Link to={`/post/${id}`}>
            See More
          </Link>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
