import { useState } from 'react';
import './App.css' 
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';

const App = () =>  {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
    <Router>
        <Header  setSearchValue={setSearchValue} />
        <Routes>
          <Route exact path="/" element={<Home searchValue={searchValue}/>} />
          <Route path="/details/:imdbId" element={<Details />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;


