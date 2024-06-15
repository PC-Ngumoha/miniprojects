import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

const ALLOWED_PATHNAMES = ['/compose', '/post'];

export default function Navbar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [prevPage, setPrevPage] = useState('/');

  useEffect(() => {
    let pathMatchFound = false;
    for (let i = 0; i < ALLOWED_PATHNAMES.length; i++) {
      const pattern = new RegExp(ALLOWED_PATHNAMES[i]);
      if (location.pathname.match(pattern)) {
        setVisible(true);
        pathMatchFound = true;
        break;
      }
    }

    if (!pathMatchFound) {
      setVisible(false);
    }

    // Determining the previous page visited.
    if (location.state) {
      if (location.state.prevPage) {
        setPrevPage(location.state.prevPage);
      }
    }
  }, [location]);

  return (
    <nav className={ styles.navContainer }>
      <div className={ styles.linkSection }>
        {
          visible ? (
            <Link
              to={ prevPage }
              replace
              state={{ prevPage: '/' }}
              className={styles.linkIcon}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          ) : (
            <div className={ styles.spacer} />
          )
        }
      </div>
      <div className={ styles.logoSection }>
        Simple<span>Blog</span>
      </div>
    </nav>
  );
}
