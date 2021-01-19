import React from "react";
import { render } from "@testing-library/react";
import Login from "../login/login";

describe("", () => {
  test("", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("error-wraper");
    expect(errorWrap.childElementCount).toBe(2);
  });
});
