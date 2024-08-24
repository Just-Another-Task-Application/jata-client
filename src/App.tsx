import { FC, Suspense, } from 'react';
import { container, } from 'tsyringe';
import { SnackbarProvider } from 'notistack';
import { useTranslation, } from 'react-i18next';
import { RouterProvider, } from 'react-router-dom';
import { 
  ThemeProvider, 
  StyledEngineProvider, 
} from '@mui/material';

import Router from '@apps/Router';

import { theme } from '@theme/main';
import { ContainerProvider, } from '@Shared/contexts/ContainerProvider';

import LoadingBar from '@Components/LoadingBar';

const MAX_SNACK_QTY = 5;

type AppProps = object;

const App: FC<AppProps> = () => {
  const { t, } = useTranslation();

  return (
    <Suspense fallback={<p>{t('common.loading')}</p>}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <ContainerProvider.Provider value={container}>
            <SnackbarProvider maxSnack={MAX_SNACK_QTY}>
              <RouterProvider 
                router={Router}
                fallbackElement={<LoadingBar/>}/>
            </SnackbarProvider>
          </ContainerProvider.Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;