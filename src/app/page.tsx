import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main style={{ minHeight: '100vh', background: '#f6f4f0', color: '#2c2c2c', padding: '80px 20px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        
        {/* Cabeçalho com a fonte Rascal e o tom roxinho */}
        <header style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: '"Rascal", serif', 
            fontSize: '72px', 
            fontWeight: 'normal', 
            margin: 0, 
            color: '#7b5c88', /* O roxinho elegante */
            letterSpacing: '2px'
          }}>
            Sideros.
          </h1>
          <p style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#888', fontSize: '16px', marginTop: '8px' }}>
            personal diary.
          </p>
        </header>

        {/* Feed de Posts com estética editorial */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', fontFamily: 'serif', fontStyle: 'italic', color: '#999' }}>
              As páginas ainda estão em branco.
            </p>
          ) : (
            posts.map((post) => (
              <article 
                key={post.id} 
                style={{ 
                  background: 'transparent', 
                  padding: '32px 0', 
                  borderTop: '1px solid #dcd5c9', /* Borda delicada */
                  borderBottom: '1px solid #dcd5c9',
                  position: 'relative' 
                }}
              >
                <h2 style={{ fontFamily: '"Rascal", serif', fontSize: '36px', marginBottom: '20px', color: '#3a3335', fontWeight: 'normal' }}>
                  {post.title}
                </h2>
                
                {/* Texto do post em fonte serifada clássica */}
                <div 
                  style={{ fontFamily: 'Georgia, serif', color: '#444', lineHeight: '1.9', fontSize: '15px' }}
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
                
                <div style={{ marginTop: '30px', fontSize: '13px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#999', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                  <a href={`/posts/${post.slug}`} style={{ color: '#7b5c88', textDecoration: 'none', letterSpacing: '1px' }}>
                    ler mais ✦
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

      </div>
    </main>
  );
}