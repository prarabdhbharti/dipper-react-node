import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
var initialCenter = {'lat':28.632739,'lng':77.211034};
ReactDOM.render(<App initialCenter={initialCenter} />, document.getElementById('app'));