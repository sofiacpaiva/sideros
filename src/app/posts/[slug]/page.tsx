import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f6f4f0', color: '#2c2c2c', padding: '80px 20px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        
        <Link href="/" style={{ display: 'inline-block', marginBottom: '40px', color: '#7b5c88', fontFamily: 'Georgia, serif', fontStyle: 'italic', textDecoration: 'none', fontSize: '15px' }}>
          ✦ voltar para o início
        </Link>

        <article style={{ background: 'transparent', borderTop: '1px solid #dcd5c9', paddingTop: '40px', paddingBottom: '60px' }}>
          <header style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ 
              fontFamily: '"Rascal", serif', 
              fontSize: '56px', 
              fontWeight: 'normal', 
              margin: '0 0 16px 0', 
              color: '#7b5c88', /* O roxinho no título do post */
              letterSpacing: '1px',
              lineHeight: '1.1'
            }}>
              {post.title}
            </h1>
            <time style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#999', fontSize: '14px' }}>
              {new Date(post.createdAt).toLocaleDateString('pt-BR')}
            </time>
          </header>

          {/* Conteúdo formatado do TipTap */}
          <div 
            style={{ 
              fontFamily: 'Georgia, serif', 
              color: '#444', 
              lineHeight: '2', 
              fontSize: '16px',
              textAlign: 'justify' 
            }}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
        
      </div>
    </main>
  );
}