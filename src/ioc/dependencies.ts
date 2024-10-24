import { 
  container, 
  Provider, 
  Lifecycle,
  InjectionToken, 
  RegistrationOptions,
  TokenProvider,
  ValueProvider,
  FactoryProvider,
  ClassProvider, 
} from 'tsyringe';
import { constructor, } from 'tsyringe/dist/typings/types';

import { FetchHttpRepository, } from '@shared/infrastructure/repositories/FetchHttpRepository';

export type InjectableType = 'constructor' 
| 'ValueProvider' 
| 'FactoryProvider' 
| 'TokenProvider' 
| 'ClassProvider';

export type Injectable = {
  token: InjectionToken;
  provider: Provider | constructor<any>;
  type: InjectableType;
  options?: RegistrationOptions;
};

const dependencies: Array<Injectable> = [
  {
    token: 'BACKEND_URL',
    provider: {
      useValue: import.meta.env.VITE_BACKEND_URL,
    },
    type: 'ValueProvider',
  },
  {
    token: 'HttpRepository',
    provider: {
      useClass: FetchHttpRepository,
    },
    type: 'ClassProvider',
    options: {
      lifecycle: Lifecycle.Singleton,
    },
  },
];

function registerDependency(dependency: Injectable): void {
  const actions: {
    [K in InjectableType]: () => void
  } = {
    'constructor': () => container
      .register<any>(dependency.token, dependency.provider as constructor<any>, dependency.options),
    'ValueProvider': () => container
      .register<any>(dependency.token, dependency.provider as ValueProvider<any>),
    'FactoryProvider': () => container
      .register<any>(dependency.token, dependency.provider as FactoryProvider<any>),
    'TokenProvider': () => container
      .register<any>(dependency.token, dependency.provider as TokenProvider<any>, dependency.options),
    'ClassProvider': () => container
      .register<any>(dependency.token, dependency.provider as ClassProvider<any>, dependency.options),
  };

  actions[dependency.type]();
}

for (const dependency of dependencies) {
  registerDependency(dependency);
}