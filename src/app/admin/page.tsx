'use client';

import { useState, useEffect } from 'react';
import TiptapEditor from '../_components/TiptapEditor';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'profile'>('posts');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (activeTab === 'profile') {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setName(data.name || '');
            setBio(data.bio || '');
            setAvatarUrl(data.avatarUrl || '');
          }
        });
    }
  }, [activeTab]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        alert('post publicado com sucesso.');
        setTitle('');
        setContent('');
      } else {
        alert('ops, houve um erro ao publicar o post.');
      }
    } catch (error) {
      alert('erro de conexão.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, avatarUrl }),
      });
      if (res.ok) {
        alert('perfil atualizado com sucesso.');
      } else {
        alert('erro ao salvar o perfil.');
      }
    } catch (error) {
      alert('erro de conexão.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#fdfbf7', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Sideros. [Painel]</h1>
            <p style={{ color: '#666', fontSize: '14px', margin: '4px 0 0 0' }}>Gerencie postagens e o perfil.</p>
          </div>
          <a href="/" style={{ fontSize: '14px', color: '#000', textDecoration: 'underline' }}>Ver o Blog →</a>
        </header>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('posts')}
            style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: activeTab === 'posts' ? '#000' : '#eee', color: activeTab === 'posts' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}
          >
            fazer post
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: activeTab === 'profile' ? '#000' : '#eee', color: activeTab === 'profile' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}
          >
            meu perfil
          </button>
        </div>

        <section style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          {activeTab === 'posts' ? (
            <div>
              <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>criar novo post</h2>
              <input 
                type="text" placeholder="Título da postagem..." value={title} onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '14px', fontSize: '18px', fontWeight: 'bold', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', boxSizing: 'border-box', outline: 'none' }}
              />
              <TiptapEditor content={content} onChange={setContent} />
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={handlePublish} disabled={isPublishing || !title || !content || content === '<p></p>'}
                  style={{ padding: '12px 28px', background: (isPublishing || !title || !content || content === '<p></p>') ? '#ccc' : '#000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {isPublishing ? 'publicando...' : 'publicar post'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>configurações de perfil</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>nome</label>
                  <input 
                    type="text" placeholder="Seu nome ou pseudônimo..." value={name} onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>URL da foto de perfil</label>
                  <input 
                    type="text" placeholder="Cole o link da sua imagem..." value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}
                    style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                  {avatarUrl && (
                    <div style={{ marginTop: '12px' }}>
                      <img src={avatarUrl} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eaeaea' }} />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>biografia</label>
                  <textarea 
                    placeholder="Escreva um pouco sobre o seu novo personagem..." value={bio} onChange={(e) => setBio(e.target.value)}
                    style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button 
                    onClick={handleSaveProfile} disabled={isSavingProfile}
                    style={{ padding: '12px 28px', background: isSavingProfile ? '#ccc' : '#000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {isSavingProfile ? 'Salvando...' : 'Salvar Perfil'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}