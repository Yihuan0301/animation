import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // 部署到 GitHub Pages 的核心修改：匹配你的仓库名 animation
    base: '/animation/', 
    
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    plugins: [react()],
    
    define: {
      // 确保在生产环境中也能读取到注入的 API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY)
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      outDir: 'dist',
    }
  };
});
