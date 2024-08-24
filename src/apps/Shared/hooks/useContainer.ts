import { useContext, } from 'react';
import { DependencyContainer, } from 'tsyringe';

import { ContainerProvider } from '@Shared/contexts/ContainerProvider';

export const useContainer: () => DependencyContainer = () => 
  useContext(ContainerProvider);
