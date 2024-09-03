import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css'
import User from './components/User';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='/register' element={<Registration/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/user' element={<User/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
