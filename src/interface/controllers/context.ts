export interface Context {
  req: unknown;
  sendJSON: (status: number, body: any) => void;
}
