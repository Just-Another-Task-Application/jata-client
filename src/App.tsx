import { 
  FC, 
  Suspense,
  useState,
} from 'react';
import { container, } from 'tsyringe';
import { SnackbarProvider } from 'notistack';
import { useTranslation, } from 'react-i18next';
import { RouterProvider, } from 'react-router-dom';
import { 
  ThemeProvider, 
  StyledEngineProvider, 
} from '@mui/material';

import Router from '@apps/Router';

import { theme as muiTheme } from '@theme/main';

import { ContainerProvider, } from '@Shared/contexts/ContainerProvider';
import { ThemeProvider as CustomTheme, ThemeType, } from '@Shared/contexts/ThemeProvider';

import LoadingBar from '@Components/LoadingBar';
import { RecoilRoot } from 'recoil';

const MAX_SNACK_QTY = 5;

type AppProps = object;

const App: FC<AppProps> = () => {
  const [ defaultTheme, setDefaultTheme, ] = useState<ThemeType>('light');

  return (
    <Suspense fallback={<LoadingBar/>}>
      <RecoilRoot>
        <CustomTheme.Provider value={{ theme: defaultTheme, setTheme: setDefaultTheme, }}>
          <ThemeProvider theme={muiTheme}>
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
        </CustomTheme.Provider>
      </RecoilRoot>
    </Suspense>
  );
}

export default App;