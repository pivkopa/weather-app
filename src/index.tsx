import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import translationEN from './locales/en.json';
import translationUA from './locales/ua.json';
import translationHE from './locales/he.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      translation: translationEN,
    },
    ua: {
      translation: translationUA,
    },
    he: {
      translation: translationHE,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
