import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Tests use their own config on purpose: the React Router Vite plugin
// is for building the app and is not loaded under Vitest.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
