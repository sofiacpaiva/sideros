export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

// Essa função roda diretamente no servidor do Next.js
async function createUser() {
  'use server';
  await prisma.user.create({
    data: {
      email: `user_${Date.now()}@exemplo.com`,
      name: 'Usuário de Teste',
      bio: 'Testando a conexão com o Neon e Prisma 7!',
      passwordHash: 'fake_hash_temporario', // <-- Adicionado aqui
    },
  });
}

export default async function TesteDbPage() {
  // Busca os usuários cadastrados no banco
  const users = await prisma.user.findMany();

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#22c55e' }}>✨ Banco Conectado com Sucesso!</h1>
      <p>Este é um teste prático usando o Prisma 7 e o Neon PostgreSQL.</p>

      <div style={{ background: '#f4f4f5', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3>Usuários no Banco ({users.length}):</h3>
        {users.length === 0 ? (
          <p style={{ color: '#71717a' }}>Nenhum usuário cadastrado ainda.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} style={{ marginBottom: '10px' }}>
                <strong>{user.name}</strong> ({user.email}) — <em>{user.bio}</em>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form action={createUser}>
        <button
          type="submit"
          style={{
            background: '#000',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Criar Usuário de Teste
        </button>
      </form>
    </main>
  );
}