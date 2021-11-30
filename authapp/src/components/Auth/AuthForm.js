import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import './AuthForm.css';

const KEY = process.env.REACT_APP_API_KEY

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()

  const context = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const eneteredEmail = emailRef.current.value
    const eneteredPassword = passwordRef.current.value
    setLoading(true)

    let url;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: eneteredEmail,
        password: eneteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setLoading(false)
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed!'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        })
      }
    }).then(data => {
      context.onLogin(data.idToken)
    }).catch(err => {
      alert(err.message)
    })
  }




  return (
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className='control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className='control'>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className='actions'>
          {!loading && <button> {isLogin ? 'Login' : 'Create Account'}</button>}
          {loading && <p>Loading</p>}
          <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section >
  );
};

export default AuthForm;
