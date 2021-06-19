import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";

describe("Componente principal", () => {
  describe("Quando eu abro o app do banco", () => {
    test("o nome é exibido", () => {
      render(<App />);

      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    test("o saldo é exibido", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    test("o botão de realizar transação é exibido", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  describe("Quando eu realizo uma transação", () => {
    describe("que é um saque", () => {
      test("com valor menor que o saldo, o valor vai diminuir", () => {
        const valores = {
          transacao: "saque",
          valor: 50,
        };
        const novoSaldo = calcularNovoSaldo(valores, 150);

        expect(novoSaldo).toBe(100);
      });

      test("com valor maior que o saldo, o valor vai ficar negativo", () => {
        const valores = {
          transacao: "saque",
          valor: 250,
        };
        const novoSaldo = calcularNovoSaldo(valores, 150);

        expect(novoSaldo).toBe(-100);
      });

      test("a transação deve ser realizada", () => {
        const { getByText, getByTestId, getByLabelText } = render(<App />);

        const saldo = getByText("R$ 1000");
        const transacao = getByLabelText("Saque");
        const valor = getByTestId("valor");
        const botaoTransacao = getByText("Realizar operação");

        expect(saldo.textContent).toBe("R$ 1000");
        fireEvent.click(transacao, { target: { value: "saque" } });
        fireEvent.change(valor, { target: { value: 10 } });
        fireEvent.click(botaoTransacao);

        expect(saldo.textContent).toBe("R$ 990");
      });
    });

    describe("que é um deposito", () => {
      test("com valor positivo, o valor vai aumentar", () => {
        const valores = {
          transacao: "deposito",
          valor: 50,
        };
        const novoSaldo = calcularNovoSaldo(valores, 150);

        expect(novoSaldo).toBe(200);
      });
    });
  });
});
