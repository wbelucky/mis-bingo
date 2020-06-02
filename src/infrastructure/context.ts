import { Context as ContextInterface } from "../interface/controllers/context";
import Express from "express";

export class Context implements ContextInterface {
  constructor(private readonly request: Express.Request, private readonly res: Express.Response) {}
  get req(): Express.Request {
    return this.request;
  }
  public sendJSON(status: number, body: any) {
    this.res.status(status).json(body).end();
  }
}
