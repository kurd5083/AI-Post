import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
   define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/layouts': path.resolve(__dirname, 'src/layouts'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/data': path.resolve(__dirname, 'src/data'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/icons': path.resolve(__dirname, 'src/icons'),
      '@/api': path.resolve(__dirname, 'src/api'),
    },
  },
})
