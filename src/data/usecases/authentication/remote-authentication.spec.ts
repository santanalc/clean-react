import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import faker from "faker";
import { mockAuthentication } from "../../../domain/test/mock-authentication";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-errors";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy); //System under test
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
});

describe("RemoteAuthentication", () => {
  test("Should call HttPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams); //Comparação de objetos
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw InvalidCredentialError if HttPostClient return 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError()); //Esperando um erro
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw UnexpectedError if HttPostClient return 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError()); //Esperando um erro
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw UnexpectedError if HttPostClient return 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError()); //Esperando um erro
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw UnexpectedError if HttPostClient return 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError()); //Esperando um erro
  });
});
