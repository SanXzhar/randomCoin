import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';

function App() {
  return (
  <div className='main'>
      <BrowserRouter>
           <Header />
           <Routes>
                 <Route path='/' index element={<Homepage />} />
                 <Route path='/coins/:id' element={<Coinpage />} />
             </Routes>
      </BrowserRouter>
   </div>
  ); 

}

export default App;
