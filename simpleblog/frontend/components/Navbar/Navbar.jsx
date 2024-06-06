import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
            <Link to='/' className={styles.linkIcon}>Back</Link>
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
