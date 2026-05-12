import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sree Dhanalakshmi Enterprises',
    short_name: 'SDE Store',
    description: 'Chennai\'s leading supplier of building materials — Cement, Steel, Bricks, and Sand.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e5f6e',
    icons: [
      {
        src: '/icon.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  };
}
