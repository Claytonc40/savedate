import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Save Date',
    short_name: 'Save Date',
    description: 'Save Date é uma aplicação para gerenciamento de datas.',
    start_url: '/auth', // URL inicial ao abrir o app
    display: 'standalone', // Abre como app, sem barra do navegador
    background_color: '#fff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
    ],
  };
}
