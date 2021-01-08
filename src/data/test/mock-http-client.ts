import {
  HttpPostClient,
  HttpPostParams,
} from "../protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
  //captura valores para comparar e cola valores fakes
  url?: string;
  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}
