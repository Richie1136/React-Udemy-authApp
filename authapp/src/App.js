import { Routes, Route, Navigate } from 'react-router-dom';
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
        {!context.isLoggedIn && <Route path='/auth' element={<AuthPage />} />}
        {context.isLoggedIn && <Route path='/profile' element={<UserProfile />} />}
        {!context.isLoggedIn && <Route path='/profile' element={<Navigate replace to='/auth' />} />}
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </Layout>
  );
}

export default App;
