import { HttpPostClient } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should call HttPostClient with correct URL", async () => {
    class HttpPostClientSpy implements HttpPostClient {
      //captura valores para comparar e cola valores fakes
      url?: string;
      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = "any_url";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy); //System under test
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
