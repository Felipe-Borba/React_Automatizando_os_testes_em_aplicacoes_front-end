import { screen, render } from "@testing-library/react";
import React from "react";
import Conta from "./Conta";

describe("Componente de conta", () => {
  test("Exibir o saldo da conta como valor monatário", () => {
    render(<Conta saldo={1000} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });
});
