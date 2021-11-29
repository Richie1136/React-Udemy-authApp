import './ProfileForm.css';

const ProfileForm = () => {
  return (
    <form className='forms'>
      <div className='controls'>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className='actions'>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
