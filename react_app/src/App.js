import React, { useState } from 'react';
import Header from './Header';

function App() {

  const [ counter, setCounter ] = useState(0);

  function soma() {
    setCounter(counter + 1);
  }

  function subtracao() {
    setCounter(counter - 1);
  }

  return (
    <>
    <Header/>
    <h1>{counter}</h1>
    <button onClick={soma}> + </button>
    <button onClick={subtracao}> - </button>
    </>

  );
}

export default App;