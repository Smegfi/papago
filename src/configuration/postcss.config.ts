
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: require.resolve("configuration/tailwind.config.ts")},
  },
};

export default config;
