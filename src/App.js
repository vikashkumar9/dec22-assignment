import { QueryParamProvider } from 'use-query-params';
import './App.css';
import Posts from './pages/posts/Posts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Login from './pages/loginPage/Login';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
