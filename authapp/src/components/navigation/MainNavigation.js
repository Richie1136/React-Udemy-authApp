import { Link } from 'react-router-dom';

import { useContext } from 'react'

import './MainNavigation.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const context = useContext(AuthContext)

  const isLoggedin = context.isLoggedIn
  return (
    <header className='header'>
      <Link to='/'>
        <div className='logo'>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
