module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
      {
        urlPattern: /\/_next\/app-build-manifest\.json$/, // Ignora este arquivo específico
        handler: 'NetworkOnly', // Não cacheia este arquivo
      },
      // Outras regras de caching
    ],
  },
});
