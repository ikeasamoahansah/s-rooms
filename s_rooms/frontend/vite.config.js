import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: "/static/",
    build: {
        manifest: true,
        outDir: resolve("./assets"),
        rollupOptions: {
            input: {
                < unique key>: '<path to your asset>'
            }
        }
    },
})
