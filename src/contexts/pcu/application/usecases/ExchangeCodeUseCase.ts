import { UseCase, } from '@shared/domain/types/UseCase';

interface Payload {
  code: string;
  state: string;
}

interface Authorization {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class ExchangeCodeUseCase implements UseCase<Payload, Authorization> {
  execute(request: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}