import { HttpResponse } from "./http-response";

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};  
export interface HttpPostClient<T, R> { //T será o tipo da body do parâmmentro e R o tipo da body do response
  post(param: HttpPostParams<T>): Promise<HttpResponse<R>>;
}
