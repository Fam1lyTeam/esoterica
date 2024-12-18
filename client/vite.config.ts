import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/esoterica/', // Путь для GitHub Pages или других сред
  plugins: [
    react(), // Плагин для React (с использованием SWC для более быстрой сборки)
    tsconfigPaths(), // Поддержка alias путей из tsconfig.json
    mkcert(), // Локальные SSL-сертификаты для https
  ],
  publicDir: './public', // Директория для статических файлов
  server: {
    host: true, // Доступ для устройств в одной сети
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          telegram: ['@telegram-apps/sdk-react', '@telegram-apps/telegram-ui'],
          ton: ['@tonconnect/ui-react'],
        },
      },
    },
  }
});


