import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Se o caminho der erro, mude para '../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    // Gera um link amigável (slug) único baseado no título e no timestamp
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();

    // Como o Sideros é seu blog autoral, pega a primeira usuária ou cria uma provisória
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'autora@sideros.com',
          passwordHash: 'hash-fake-temporario', 
          name: 'Autora'
        }
      });
    }

    // Salva o post no banco de dados Neon
    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        authorId: user.id,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar post:", error);
    return NextResponse.json({ error: 'Erro interno ao publicar' }, { status: 500 });
  }
}