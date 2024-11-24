import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  base: "/app1",
  plugins: [
    react(),
    federation({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './App1': './src/App',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build : {
    modulePreload : false,
    target : "esnext",
    minify : false,
    cssCodeSplit: false
  }
});