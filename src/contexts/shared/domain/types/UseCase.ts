export interface UseCase<Request, Response = unknown> {
  execute(request: Request): Promise<Response>;
}