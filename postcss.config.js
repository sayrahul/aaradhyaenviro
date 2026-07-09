module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' || process.argv.includes('--minify') || process.argv.includes('-m') ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      }
    } : {})
  }
}
