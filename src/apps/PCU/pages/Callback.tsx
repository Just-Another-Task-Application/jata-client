import {
  FC,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation, } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Spinner from '@Shared/Components/Spinner';

import { useDependency, } from '@Shared/hooks/useDependency';
import { HttpRepository, } from '@shared/domain/repositories/HttpRepository';

type CallbackProps = object;

const Callback: FC<CallbackProps> = () => {
  const navigate = useNavigate();
  const { t, } = useTranslation();
  
  const [queryParams, ,] = useSearchParams();

  const backendUrl = useDependency<string>('BACKEND_URL');
  const httpRepository = useDependency<HttpRepository>('HttpRepository');

  const exchangeCodeAndFetchAccessToken: () => Promise<any> = useCallback(async () => {
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    if (!code || state !== sessionStorage.getItem('oauth_state')) return;

    const response = await httpRepository.post<any>(
      `${backendUrl}/oauth/exchange_code`, 
      {
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response?.data;
  }, [queryParams, httpRepository,]);
  
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      exchangeCodeAndFetchAccessToken()
        .then(data => {
          console.log('result', data);

          if (data) return navigate('/pcu');
        })
        .catch((err) => console.error(err));

    return () => {
      isSubscribed = false;
      sessionStorage.removeItem('oauth_state');
    };
  }, [exchangeCodeAndFetchAccessToken,]);

  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='size-full flex justify-center items-center max-w-screen-sm mx-auto'>
        <Spinner label={t('common.loading')}/>
      </div>
    </section>
  );
};

export default Callback;