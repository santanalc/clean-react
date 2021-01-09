import { Http2ServerResponse } from "http2";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-errors";
import { AuthenticationParams } from "../../../domain/usecases/authentication";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httResponse.statusCode) {
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      default:
        return Promise.resolve();
    }
  }
}
