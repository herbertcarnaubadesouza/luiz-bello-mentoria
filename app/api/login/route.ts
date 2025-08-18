import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Tenta achar usuário
    let user = await prisma.user.findUnique({ where: { email } });

    // Se não existir, cria o usuário
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: { email, password: hashedPassword, name: email.split("@")[0] },
      });
    }

    // Verifica a senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }

    // Aqui você pode criar token JWT ou sessão (simplificado)
    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no login" }, { status: 500 });
  }
}
