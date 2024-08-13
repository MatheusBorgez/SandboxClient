import React, { useState } from 'react';
import Header from './components/Header.js';
import Body from './components/Body.js';

function App() {

  return (
    <div id="app" >

      <main className="gray">
        <div className="title text-white">
          <Header />
        </div>
        <div className="content"> 
          <Body />
        </div>
      </main>
    </div>
  );
}

export default App;