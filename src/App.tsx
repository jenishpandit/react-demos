import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import TodoApp from './TodoApp';
import Navbar from './navbar/Navbar';
import QuizApp from './quizApp/QuizApp';
import Products from './reactQuery/Products';
import Product from './reactQuery/Product';
import Parallel from './reactQuery/Parallel';
//import Optimistic from './reactQuery/Optimistic';
import Dependant from './reactQuery/Dependant';
import Pagination from './reactQuery/Pagination';
import Password from './pass-genrate/Password'
import TypingSpeed from './typing-speed/TypingSpeed';
import ShortUrl from './short-url/ShortUrl';


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/todo" element={< TodoApp/>} />
        <Route path="/quizapp" element={<QuizApp />} />
        <Route path="/products" element={<Products/>} />
        <Route path='/products/:productId' element={<Product/>}/>
        <Route path='/parallel' element={<Parallel/>}/>
        {/* <Route path='/optimistic' element={<Optimistic/>}/> */}
        <Route path='/dependent' element={<Dependant/>}/>
        <Route path='/pagination' element={<Pagination/>}/>
        <Route path='/password' element={<Password/>}/>
        <Route path='/typing' element={<TypingSpeed/>}/>
        <Route path='/shorturl' element={<ShortUrl/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App;
