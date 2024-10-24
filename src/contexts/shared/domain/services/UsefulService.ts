export interface UsefulService {
  transformStringToCamelCase(payload: string): string;
  transformObjectToCamelCase(payload: any): any;
}