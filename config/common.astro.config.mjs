import react from "@astrojs/react";

/** @type {import('astro/config').AstroUserConfig} */
export const commonConfig = {
  site: "https://lastfm.aiden.tv",
  integrations: [react()],
};
