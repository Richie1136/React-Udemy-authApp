import { useState, useRef } from 'react';

import './AuthForm.css';

const KEY = process.env.REACT_APP_API_KEY

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef()
  const passwordRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const eneteredEmail = emailRef.current.value
    const eneteredPassword = passwordRef.current.value

    if (isLogin) {

    } else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          email: eneteredEmail,
          password: eneteredPassword,
          returnSecureToken: true
        })
      })
    }

  }


  return (
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className='control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className='control'>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className='actions'>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
