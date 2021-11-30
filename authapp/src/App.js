import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UserProfile from './components/userprofile/UserProfile';
import AuthPage from './components/authpage/AuthPage';
import HomePage from './components/homepage/HomePage';

import { useContext } from 'react'
import AuthContext from './store/auth-context';


function App() {
  const context = useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        {context.isLoggedIn && <Route path='/profile' element={<UserProfile />} />}
      </Routes>
    </Layout>
  );
}

export default App;
