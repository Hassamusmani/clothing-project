import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import { SignInAndSignUpPage } from './pages/signIn-and-signUp/signIn-and-signUp.component';

function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
        <Route path='/signin' element={<SignInAndSignUpPage />} />
        </Routes>
    </div>
  );
}

export default App;
