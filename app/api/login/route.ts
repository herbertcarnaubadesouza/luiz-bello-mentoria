import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({ where: { email } });

    // Cria o usuário se não existir
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: { email, password: hashedPassword, name: email.split("@")[0] },
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no login" }, { status: 500 });
  }
}
