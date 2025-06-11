import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import {
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import { routes } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks';

const location = new ReactLocation();
const queryClient = new QueryClient()
setDefaultBreakpoints([
  { base: 0 },
  { sm: 640 },
  { md: 768 },
  { lg: 1024 },
  { xl: 1280 },
  { "2xl": 1536 },
])
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BreakpointProvider>
        <Router
          location={location}
          routes={routes}
        >
          <App />
          <ReactLocationDevtools initialIsOpen={false} />
        </Router>
      </BreakpointProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
