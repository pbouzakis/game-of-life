import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
