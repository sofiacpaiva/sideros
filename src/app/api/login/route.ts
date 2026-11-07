import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Compara a senha enviada com a do seu arquivo .env
    if (password === process.env.ADMIN_PASSWORD) {
      // Define um cookie para manter a sua sessão ativa
      (await cookies()).set('sideros_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: '/',
      });
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ message: 'Senha incorreta.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao processar o login.' }, { status: 500 });
  }
}