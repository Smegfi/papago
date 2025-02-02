
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: "configuration/tailwind.config.ts" }
  },
};

export default config;
