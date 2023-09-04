import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: import.meta.env.MODE === 'production' ? '/react-todolist-newbie/' : '/',
  // base: process.env.NODE_ENV === 'production' ? '/react-todolist-newbie/' : '/',
  plugins: [react()],
})
