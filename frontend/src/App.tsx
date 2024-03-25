import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <Route path='/' element={<Layout/>}>
          
        </Route>
    </div>
  );
}
 

export default App
