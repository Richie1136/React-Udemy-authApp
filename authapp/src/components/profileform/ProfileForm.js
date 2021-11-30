import { useRef, useContext, useState } from 'react'
import './ProfileForm.css';
import AuthContext from '../../store/auth-context';

const KEY = process.env.REACT_APP_API_KEY



const ProfileForm = () => {
  // const [loading, setLoading] = useState(false);

  const newPasswordRef = useRef()

  const context = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const enteredNewPassword = newPasswordRef.current.value
    // setLoading(true)

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: context.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // setLoading(false)
    })
  }
  return (
    <form className='forms' onSubmit={handleSubmit}>
      <div className='controls'>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordRef} />
      </div>
      <div className='actions'>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
