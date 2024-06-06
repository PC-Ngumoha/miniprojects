import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === '/compose') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    <nav className={ styles.navContainer }>
      <div className={ styles.linkSection }>
        {
          visible ? (
            <Link to='/' className={styles.linkIcon}>
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
