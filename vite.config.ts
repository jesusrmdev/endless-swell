import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@engines': path.resolve(__dirname, 'src/engines'),
      '@scenes': path.resolve(__dirname, 'src/scenes'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@world': path.resolve(__dirname, 'src/world'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
