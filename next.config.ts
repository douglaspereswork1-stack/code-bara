import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Domínio antigo → novo. /api fica de fora: o MP não segue 308 em POST e
  // checkouts abertos antes da troca ainda notificam o webhook no lilac.
  async redirects() {
    return [{
      source: '/:path((?!api/).*)',
      has: [{ type: 'host', value: 'devfullstack-lilac.vercel.app' }],
      destination: 'https://code-zen-br.vercel.app/:path',
      permanent: true,
    }]
  },
};

export default nextConfig;
