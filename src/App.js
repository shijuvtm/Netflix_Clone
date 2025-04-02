import NavBar from './Components/NavBar/NavBar';
import React from 'react'
import './App.css'
import Banner from './Components/Banner/Banner';
import Post from './Components/RowPost/Post';
import {originals,action} from './url'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <Post url={originals} title="Netflix Originals"/>
      <Post url={action} title="Actions" isSmall />
    </div>
  );
}

export default App;
