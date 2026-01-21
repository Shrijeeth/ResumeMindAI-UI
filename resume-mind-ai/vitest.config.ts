import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    css: false,
    exclude: ["node_modules/**", "coverage/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "app/**/*.{ts,tsx}",
        "app/**/route.ts",
        "app/**/layout.tsx",
        "app/**/page.tsx",
        "lib/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/node_modules/**",
        "**/coverage/**",
        "**/.next/**",
        "**/out/**",
        "**/build/**",
        "**/*.config.{js,ts,mjs,cjs}",
        "**/next.config.*",
        "**/postcss.config.*",
        "**/tailwind.config.*",
        "**/vitest.config.*",
        "**/tsconfig.*",
      ],
    },
  },
});
