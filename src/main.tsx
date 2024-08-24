import 'reflect-metadata';

import '@ioc/di';

import './index.css';

import { StrictMode, } from 'react';
import { createRoot, } from 'react-dom/client';
import { initReactI18next,  } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import App from './App';

import es from '@assets/locales/es.json';
import en from '@assets/locales/en.json';

async function init(): Promise<boolean> {
  await i18next.use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      resources: {
        es,
        en,
      },
      fallbackLng: 'es',
      lowerCaseLng: true,
      returnNull: true,
      returnObjects: true,
      interpolation: {
        escapeValue: false,
      },
    });
  
  return new Promise<boolean>((resolve) => resolve(true));
}

function render(): void {
  const rootElement: HTMLElement | null = document.getElementById('root');

  const root = createRoot(rootElement!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

init()
  .then(() => render())
  .catch(err => console.error(err));