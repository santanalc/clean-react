import {
  HttpPostClient,
  HttpPostParams,
} from "../protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
  //SPY captura valores para comparar e cola valores fakes

  url?: string;
  body?: object;

  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve();
  }
}
