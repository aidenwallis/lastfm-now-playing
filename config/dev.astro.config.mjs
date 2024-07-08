import { defineConfig } from "astro/config";
import { commonConfig } from "./common.astro.config.mjs";

// https://astro.build/config
export default defineConfig({
  ...commonConfig,
  output: "server",
});
