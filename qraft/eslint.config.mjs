import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig.map((config) => {
    if (config.plugins?.["@typescript-eslint"]) {
      return {
        ...config,
        rules: {
          ...config.rules,
          "@typescript-eslint/no-unused-vars": "warn",
        },
      };
    }
    if (config.plugins?.["@next/next"]) {
      return {
        ...config,
        rules: {
          ...config.rules,
          "@next/next/no-img-element": "warn",
        },
      };
    }
    return config;
  }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
