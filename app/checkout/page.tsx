// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { CreditCard } from "lucide-react"; // Ícones

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("pix");

  const paymentMethods = [
    {
      id: "pix",
      label: "Pix",
      icon: (
        <img
          src="https://img.icons8.com/fluent/512/pix.png"
          alt="Pix"
          className="w-5 h-5 bg-transparent"
          style={{ background: "transparent" }}
        />
      ),
    },
    {
      id: "card",
      label: "Cartão",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "apple",
      label: "Apple Pay",
      icon: (
        <img src="/images/applepay.png" alt="Apple Pay" className="w-10 h-10" />
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 space-y-8 my-12">
        {/* Identificação */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Identificação
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <input
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nome completo"
            />
            <input
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="E-mail"
            />
            <input
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="CPF/CNPJ"
            />
            <input
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Celular"
            />
          </div>
        </section>

        {/* Pagamento */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Forma de pagamento
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-base font-semibold
  transition-all duration-300 ease-in-out
  ${
    selectedPayment === method.id
      ? "bg-white text-gray-900 border-gray-400 shadow-lg scale-105"
      : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
  }`}
              >
                <span className="flex items-center">
                  {method.id === "apple" ? (
                    <img
                      src="/images/applepay.png"
                      alt="Apple Pay"
                      className="w-8 h-8"
                    />
                  ) : (
                    method.icon
                  )}
                </span>
                {method.label}
              </button>
            ))}
          </div>

          {/* Conteúdo do método selecionado */}
          {selectedPayment === "pix" && (
            <div className="p-4 border rounded-lg text-center text-sm text-gray-600 bg-gray-100 space-y-2">
              <div className="mb-2 font-semibold text-gray-800">
                Informações sobre o pagamento via PIX
              </div>
              <div>O pagamento é instantâneo e liberação imediata.</div>
              <div>
                Ao clicar em <strong>“Finalizar Compra”</strong> você será
                encaminhado para um ambiente seguro, onde encontrará o passo a
                passo para realizar o pagamento.
              </div>
              <div className="mt-4">Código Pix gerado aqui (visual)</div>
            </div>
          )}
          {selectedPayment === "card" && (
            <div className="grid grid-cols-1 gap-3">
              <input
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Número do cartão"
              />
              <input
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nome no cartão"
              />
              <div className="flex gap-3">
                <input
                  className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Validade"
                />
                <input
                  className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="CVV"
                />
              </div>
            </div>
          )}
          {selectedPayment === "apple" && (
            <div className="p-4 border rounded-lg text-center text-sm text-gray-600 bg-gray-100 space-y-2">
              <div className="mb-2 font-semibold text-gray-800">
                Mais rápido, fácil e seguro:
              </div>
              <div>
                1. Pague com um toque sem precisar preencher os dados do cartão
              </div>
              <div>
                2. Disponível para dispositivos compatíveis com Apple Pay
              </div>
              <div>3. Sua compra segura e validada pela Apple</div>
              <div className="mt-4">Botão Apple Pay visual</div>
            </div>
          )}
        </section>

        {/* Resumo da compra */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Resumo da compra
          </h2>
          <div className="flex justify-between text-gray-700">
            <span>Ingressos (2x)</span>
            <span>R$ 200,00</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Taxas</span>
            <span>R$ 10,00</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>R$ 210,00</span>
          </div>
          <button
            className="w-full text-white py-3 rounded-lg text-lg font-semibold transition"
            style={{
              background: "linear-gradient(90deg, #fbbf24, #f97316, #c2410c)",
            }}
          >
            Finalizar Compra
          </button>
        </section>
      </div>
    </div>
  );
}
