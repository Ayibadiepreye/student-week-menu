import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  let port: number | undefined;
  let basePath: string = "/";
  
  if (mode === "development") {
    const rawPort = env.PORT;
    if (!rawPort) {
      throw new Error("PORT environment variable is required but was not provided.");
    }
    port = Number(rawPort);
    if (Number.isNaN(port) || port <= 0) {
      throw new Error(`Invalid PORT value: "${rawPort}"`);
    }
    
    basePath = env.BASE_PATH;
    if (!basePath) {
      throw new Error("BASE_PATH environment variable is required but was not provided.");
    }
  }

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(__dirname),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: port
      ? {
          port,
          strictPort: true,
          host: "0.0.0.0",
          allowedHosts: true,
          fs: {
            strict: true,
          },
          proxy: {
            "/api": {
              target: "http://localhost:3001",
              changeOrigin: true,
            },
          },
        }
      : undefined,
    preview: port
      ? {
          port,
          host: "0.0.0.0",
          allowedHosts: true,
        }
      : undefined,
  };
});
