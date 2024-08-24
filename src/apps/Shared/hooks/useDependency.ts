import { useMemo, } from 'react';
import { InjectionToken } from 'tsyringe';

import { useContainer } from './useContainer';

export const useDependency = <T>(
  token: InjectionToken
): T => {
  const container = useContainer();
  return useMemo(
    () => container.resolve(token), [token, container],
  );
}