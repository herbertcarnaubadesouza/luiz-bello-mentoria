import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, quantity, price } = body;

  try {
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // 🔒
      },
      body: JSON.stringify({
        transaction_amount: price,
        description: title,
        payment_method_id: "pix",
        payer: {
          email: "comprador@email.com",
          first_name: "Nome",
          last_name: "Sobrenome",
          identification: {
            type: "CPF",
            number: "12345678900",
          },
        },
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento PIX" },
      { status: 500 }
    );
  }
}
