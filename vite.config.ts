import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [vue()],
      root: './src/playground',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'),
        },
      },
    }
  } else {
    return {
      plugins: [
        vue(),
        dts({
          insertTypesEntry: true,
          outDir: 'dist/types',
        }),
      ],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/lib/index.ts'),
          name: 'GlassUI',
          fileName: (format) => `glass-ui.${format}.js`,
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'),
        },
      },
    }
  }
})
