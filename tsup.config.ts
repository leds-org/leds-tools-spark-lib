import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["packages/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  dts: true,
  outDir: "dist"
});
