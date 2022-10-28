import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      name: "umd",
      entry: "./src/Pupi.ts",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
