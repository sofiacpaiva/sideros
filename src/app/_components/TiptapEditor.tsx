'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface TiptapEditorProps {
  content: string;
  onChange: (richText: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Youtube.configure({
        inline: false,
        width: 640,
        height: 360,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Escreva sua história, cole um link do Spotify, adicione fotos ou vídeos...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  // Funções para adicionar mídias via prompt rápido
  const addImage = () => {
    const url = window.prompt('Cole o link da imagem (URL):');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('Cole o link do vídeo do YouTube:');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  const addSpotifyEmbed = () => {
    const url = window.prompt('Cole o link de incorporação (Embed) ou URL da música/playlist do Spotify:');
    if (url) {
      // Se o usuário colou o link comum do Spotify, convertemos para o formato embed se necessário ou inserimos o iframe direto
      let embedUrl = url;
      if (url.includes('spotify.com') && !url.includes('/embed/')) {
        embedUrl = url.replace('spotify.com/', 'spotify.com/embed/');
      }
      
      const iframeHtml = `<iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      editor.chain().focus().insertContent(iframeHtml).run();
    }
  };

  const addAppleMusicEmbed = () => {
    const url = window.prompt('Cole o link de incorporação (Embed) do Apple Music:');
    if (url) {
      const iframeHtml = `<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="${url}"></iframe>`;
      editor.chain().focus().insertContent(iframeHtml).run();
    }
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', overflow: 'hidden' }}>
      {/* Barra de Ferramentas / Botões */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '10px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{ padding: '6px 10px', background: editor.isActive('bold') ? '#000' : '#fff', color: editor.isActive('bold') ? '#fff' : '#000', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{ padding: '6px 10px', background: editor.isActive('italic') ? '#000' : '#fff', color: editor.isActive('italic') ? '#fff' : '#000', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontStyle: 'italic' }}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{ padding: '6px 10px', background: editor.isActive('heading', { level: 2 }) ? '#000' : '#fff', color: editor.isActive('heading', { level: 2 }) ? '#fff' : '#000', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{ padding: '6px 10px', background: editor.isActive('bulletList') ? '#000' : '#fff', color: editor.isActive('bulletList') ? '#fff' : '#000', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
        >
          • Lista
        </button>

        <div style={{ width: '1px', background: '#d1d5db', margin: '0 4px' }} />

        <button type="button" onClick={addImage} style={{ padding: '6px 10px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
          🖼️ Imagem
        </button>
        <button type="button" onClick={addYoutubeVideo} style={{ padding: '6px 10px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
          ▶️ YouTube
        </button>
        <button type="button" onClick={addSpotifyEmbed} style={{ padding: '6px 10px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
          🟢 Spotify
        </button>
        <button type="button" onClick={addAppleMusicEmbed} style={{ padding: '6px 10px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
          🍎 Apple Music
        </button>
      </div>

      {/* Área onde o texto é digitado */}
      <EditorContent editor={editor} />
    </div>
  );
}