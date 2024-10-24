import { 
  FC, 
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation, } from 'react-i18next';

import { 
  Button,
  Typography, 
} from '@theme/main';
import { useSnackbar } from 'notistack';
import { useRouteError } from 'react-router-dom';

const FPS = 60;

const MINIGAME_INTERVAL = 1000 / FPS;

const ONE_SECOND_IN_MS = 1000;

const RELOAD_TIMEOUT_IN_MS = ONE_SECOND_IN_MS * 3;

function randomNumber(limit: number): number {
  return Math.floor(Math.random() * (limit + 1));
}

type ErrorLayoutProps = object;

const ErrorLayout: FC<ErrorLayoutProps> = () => {
  const { t, } = useTranslation();

  const error = useRouteError();

  console.log('error', error);

  const snackbarRef = useRef<number | string | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const reloadIntervalRef = useRef<number | string | null>(null);
  const minigameIntervalRef = useRef<number | string | null>(null);

  const {
    closeSnackbar,
    enqueueSnackbar,
  } = useSnackbar();

  const [score, setScore,] = useState<number>(0);
  const [streak, setStreak,] = useState<number>(0);
  const [axisPositions, setAxisPositions,] = useState<{ x: number; y: number; } | null>(null);
  const [loadingReload, setLoadingReload,] = useState<boolean>(false);
  const [minigameStarted, setMinigameStarted,] = useState<boolean>(false);

  const handleFinishMinigame: () => void = useCallback(() => {
    if (minigameIntervalRef.current)
      clearInterval(minigameIntervalRef.current);

    setMinigameStarted(false);
  }, []);

  const handleStartMinigame: () => void = useCallback(
    () => setMinigameStarted(true), []
  );

  // TODO: show menu to go back when game is paused
  const playMinigame: () => void = useCallback(() => {
    const container = gameContainerRef.current;

    const width = container?.clientWidth;
    const height = container?.clientHeight;

    const positionX = randomNumber(width!);
    const positionY = randomNumber(height!);

    setAxisPositions({
      x: positionX,
      y: positionY,
    });
  }, []);

  useEffect(() => {
    if (!minigameStarted) return;

    window.addEventListener('resize', playMinigame);

    return () => {
      window.removeEventListener('resize', playMinigame);
    };
  }, []);

  useEffect(() => {
    if (!minigameStarted) return;

    if (snackbarRef.current) closeSnackbar(snackbarRef.current);

    snackbarRef.current = enqueueSnackbar('Minigame started!');

    // minigameIntervalRef.current = window.setInterval(() => {
    //   if (!gameContainerRef.current)
    //     handleFinishMinigame();
    // }, MINIGAME_INTERVAL);
    if (!gameContainerRef.current)
      handleFinishMinigame();

    playMinigame();

    return () => {
      if (minigameIntervalRef.current)
        clearInterval(minigameIntervalRef.current);
    };
  }, [minigameStarted, playMinigame]);

  const handleReload: () => void = useCallback(() => {
    const now = Date.now();

    snackbarRef.current = enqueueSnackbar(
      t('error.reload.info', { 
        seconds: RELOAD_TIMEOUT_IN_MS / ONE_SECOND_IN_MS 
      }),
      {
        variant: 'info',
      }
    );
    
    if (reloadIntervalRef.current)
      clearInterval(reloadIntervalRef.current);

    setLoadingReload(true);
    reloadIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - now;
      if (elapsed >= RELOAD_TIMEOUT_IN_MS) {
        window.location.reload();
        setLoadingReload(false);
      }
    }, ONE_SECOND_IN_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (reloadIntervalRef.current)
        clearInterval(reloadIntervalRef.current);

      if (snackbarRef.current)
        closeSnackbar(snackbarRef.current);
    };
  }, []);

  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='relative h-full w-full max-w-screen-2xl mx-auto'>
        {!minigameStarted && (
          <div className='relative h-full w-full py-4 px-6 flex flex-col justify-center items-center gap-y-8'>
            <Typography 
              variant='h1'
              className='text-5xl font-bold font-platypi text-center text-dark-700'>
              {t('error.title')}
            </Typography>
            <div className='flex flex-col gap-y-4 max-w-screen-md'>
              <Typography
                variant='body1'
                className='font-raleway text-center text-2xl'>
                {t('error.description')}
              </Typography>
              <div className='self-center'>
                <Button
                  variant='text'
                  className='text-lg'
                  loading={loadingReload}
                  onClick={() => handleReload()}>
                  {t('error.reload.message')}
                </Button>
              </div>
            </div>
            <div className='absolute bottom-0 mb-6 flex items-center gap-x-1 text-lg'>
              <span>{t('error.minigame.question')}</span>
              <span 
                className='text-primary-main underline hover:cursor-pointer font-semibold'
                onClick={() => handleStartMinigame()}>
                {t('error.minigame.play')}
              </span>
            </div>
          </div>
        )}
        {minigameStarted && (
          <div className='w-full h-full pt-6'>
            <header className='w-full min-h-16 flex items-center py-4 px-8 border border-dark-200 rounded-xl'>
              <Button 
                variant='text'
                onClick={() => handleFinishMinigame()}>
                {t('common.buttons.goback')}
              </Button>
              <div className='ml-auto flex flex-col gap-y-2'>
                <span className='font-platypi text-4xl text-center leading-7'>{score}</span>
                <span className='text-base font-medium font-raleway'>
                  {t('error.minigame.score')}
                </span>
              </div>
            </header>
            <div 
              ref={(ref) => {
                gameContainerRef.current = ref;
              }}
              className='relative h-full w-full py-6'>
              <button 
                className='relative w-[20px] h-[20px] rounded-full bg-primary-main z-10'
                onClick={() => {
                  playMinigame();
                  setScore(score + 1);
                }}
                style={{
                  top: `${axisPositions?.y}px`,
                  left: `${axisPositions?.x}px`,
                }}>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ErrorLayout;