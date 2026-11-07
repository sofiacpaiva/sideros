'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.message || 'Erro ao entrar.');
      setLoading(false);
    }
  };

  return (
    <main style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', background: '#fdfbf7' }}>
      <form onSubmit={handleLogin} style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', maxWidth: '360px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>Sideros.</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>Acesso restrito à autora.</p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>SENHA DE ACESSO</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
            placeholder="Digite sua senha..."
          />
        </div>

        {error && <p style={{ color: '#e11d48', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', background: '#000', color: '#fff', padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Entrando...' : 'Entrar no Painel'}
        </button>
      </form>
    </main>
  );
}