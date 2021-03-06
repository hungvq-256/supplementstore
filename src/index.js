import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import store from "./store";
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          TransitionComponent={Slide}
          autoHideDuration={3000}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
