import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rollupPluginNodeResolve(),
    react()
  ],
})
