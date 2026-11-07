import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    return NextResponse.json(user || {});
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar perfil' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { name, bio, avatarUrl } = await request.json();
    let user = await prisma.user.findFirst();

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name, bio, avatarUrl },
      });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar perfil' }, { status: 500 });
  }
}