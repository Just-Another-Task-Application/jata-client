import { UsefulService, } from '@shared/domain/services/UsefulService';

export class UsefulServiceImplementation implements UsefulService {
  transformStringToCamelCase(text: string): string {
    return text
      .toLowerCase()
      .replace(/([-_][a-z])/g, group =>
        group
          .toUpperCase()
          .replace('-', '')
          .replace('_', ''),
      );
  }

  transformObjectToCamelCase(payload: any) {
    return Object
      .entries(payload)
      .reduce((result, [key, value,]) => ({
        ...result,
        [this.transformStringToCamelCase(key)]: value,
      }), {});
  }
}