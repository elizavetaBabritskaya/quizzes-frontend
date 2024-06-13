import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {store} from './store/store';
import 'antd/dist/reset.css'
import './fonts/Roboto/Roboto-Black.ttf'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
