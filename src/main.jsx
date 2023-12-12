// scroll bar
import 'simplebar/src/simplebar.css';
// editor
import 'react-quill/dist/quill.snow.css';
// react leadt
import 'leaflet/dist/leaflet.css';

import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CollapseDrawerProvider } from './context/collapseDrawerContext';
import { AxiosInterceptor } from './interceptors/axios.interceptor';

// Translations API
import './i18n';
import { Suspense } from 'react';

// ----------------------------------------------------------------------
AxiosInterceptor();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Suspense required for i18next
  <Suspense fallback={null}>
    <HelmetProvider>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxProvider store={store}>
          <CollapseDrawerProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </CollapseDrawerProvider>
        </ReduxProvider>
      </PersistGate>
    </HelmetProvider>
  </Suspense>
);

// If you want to enable client cache, register instead.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
