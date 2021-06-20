import React from "react";
import { screen, render } from "@testing-library/react";
import api from "./api";
import App from "./App";

jest.mock("./api");

describe("Requisições para API", () => {
  test("Exibir lista de transações através da API", () => {
    api.listaTransacoes.mockResolvedValue([
      {
        id: 1,
        valor: 10,
        transacao: "saque",
        data: "10/08/2020",
      },
      {
        id: 2,
        valor: 20,
        transacao: "deposito",
        data: "26/09/2020",
      },
    ]);

    render(<App />);

    expect(screen.getByTestId("transacoes").children.length).toBe(2);
  });
});
