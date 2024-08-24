import { Context, createContext, } from 'react';
import { DependencyContainer, } from 'tsyringe';

export const ContainerProvider: Context<DependencyContainer> = 
  createContext<DependencyContainer>(undefined as unknown as DependencyContainer);
ContainerProvider.displayName = 'ContainerProvider';
