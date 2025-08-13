// app/checkout/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, Clock } from "lucide-react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const cartParam = searchParams.get("cart");

  const cart = useMemo(() => {
    try {
      return cartParam ? JSON.parse(decodeURIComponent(cartParam)) : null;
    } catch {
      return null;
    }
  }, [cartParam]);

  const [selectedPayment, setSelectedPayment] = useState("pix");

  // --- Timer de 15 minutos ---
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const totalTickets =
    cart?.items?.reduce((acc: number, item: any) => acc + item.qty, 0) || 0;
  const totalPrice =
    cart?.items?.reduce(
      (acc: number, item: any) => acc + item.price * item.qty,
      0
    ) || 0;
  const totalFee =
    cart?.items?.reduce(
      (acc: number, item: any) => acc + item.fee * item.qty,
      0
    ) || 0;
  const grandTotal = totalPrice + totalFee;

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
      icon: <img src="/appleicon.png" alt="Apple Pay" className="w-5 h-5" />,
    },
  ];

  if (!cart) {
    return <div className="p-8 text-center">Carrinho vazio ou inválido</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 space-y-8 my-12">
        {/* Timer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Tempo restante para concluir o pagamento:
          </p>
          <div className="flex items-center justify-center gap-2">
            <Clock
              size={24}
              style={{
                background: "linear-gradient(90deg, #fbbf24, #f97316, #c2410c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
            <p
              className="text-2xl font-bold"
              style={{
                background: "linear-gradient(90deg, #fbbf24, #f97316, #c2410c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-base font-semibold transition-all duration-300 ease-in-out ${
                  selectedPayment === method.id
                    ? "bg-white text-gray-900 border-gray-400 shadow-lg scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                }`}
              >
                <span className="flex items-center">{method.icon}</span>
                {method.label}
              </button>
            ))}
          </div>

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
          {cart.items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-gray-700">
              <span>
                {item.name} ({item.qty}x)
              </span>
              <span>
                R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-gray-700">
            <span>Taxas</span>
            <span>R$ {totalFee.toFixed(2).replace(".", ",")}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>R$ {grandTotal.toFixed(2).replace(".", ",")}</span>
          </div>
          <button
            disabled={timeLeft <= 0}
            className={`w-full text-white py-3 rounded-lg text-lg font-semibold transition ${
              timeLeft <= 0 ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            style={{
              background:
                timeLeft > 0
                  ? "linear-gradient(90deg, #fbbf24, #f97316, #c2410c)"
                  : undefined,
            }}
          >
            {timeLeft > 0 ? "Finalizar Compra" : "Tempo Expirado"}
          </button>
        </section>
      </div>
    </div>
  );
}
