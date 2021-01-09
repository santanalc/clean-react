import {
  HttpPostClient,
  HttpPostParams,
} from "../protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";

export class HttpPostClientSpy implements HttpPostClient {
  //SPY captura valores para comparar e cola valores fakes

  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
