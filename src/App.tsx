import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Graph } from './components/Graph';
import { Home } from './components/Home';
import { TestGraph } from './components/TestGraph';

function App() {
    const [a, setA] = useState({
        labels: [2000, 2001, 2002],
        datasets: [{
            labels: 'users gained',
            data: [34, 46, 23]
        }]})
        

    return (
        <div className="App">
            <h1>Graph Display</h1>
            <Home />
            {/* <Graph chartData={a}/> */}
        </div>
    );
}

export default App;
