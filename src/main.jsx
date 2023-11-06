import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import { ResetStyle, BaseStyle } from './themes/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle />
    <BaseStyle />

    <App />
  </React.StrictMode>,
);
