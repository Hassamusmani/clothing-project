import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
      </Routes>
    </div>
  );
}

export default App;
