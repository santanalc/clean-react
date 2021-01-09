import { Http2ServerResponse } from "http2";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-errors";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AccountModel } from "../../../domain/models/account-model";
import {
  Authentication,
  AuthenticationParams,
} from "../../../domain/usecases/authentication";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams, //Tipo do parâmetro
      AccountModel // Tipo do retorno
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httResponse.statusCode) {
      case HttpStatusCode.ok:
        return httResponse.body;
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
